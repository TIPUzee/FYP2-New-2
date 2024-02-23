from __future__ import annotations

from typing import Any, Literal, Optional, TypeVar
from abc import ABC, abstractmethod

from ..funcs import Func
from ..sql.sql import SQL

SQLEntityChildType = TypeVar('SQLEntityChildType', bound='SQLEntity')


class SQLEntity(ABC):
    """
    The SQLEntity class provides a base class for creating SQL entities with dynamic properties.
    It allows for easy manipulation and interaction with SQL databases.

    Usage Example:
    --------------
    >>> # Create a subclass of SQLEntity
    ... class User(SQLEntity):
    ...     m_id = 0
    ...     m_name = ""
    ...     m_email = ""

    >>> # Instantiate the User class
    ... user = User()

    >>> # Set property values
    ... user.m_id = 1
    ... user.m_name = "John Doe"
    ... user.m_email = "john.doe@example.com"

    >>> # Insert the entity into the database
    >>> # The following creates the query as
    >>> # INSERT INTO user (m_id, m_name, m_email) VALUES (1, 'John Doe', 'john.doe@example.com') LIMIT 1
    ... user.insert()

    >>> # Select entities from the database
    >>> # The following creates the query as
    >>> # SELECT m_id, m_email FROM user WHERE m_name != 'John Doe'
    ... result = user.select(where_not_equals=[user.key.m_id])

    >>> # Select entities from the database
    >>> # The following creates the query as
    >>> # SELECT m_id, m_name, m_email FROM user WHERE m_name != 'John Doe' LIMIT -1
    ... result = user.select(select_cols='All', where_not_equals=[user.key.m_id], _limit=-1)

    >>> # Update the entity in the database
    >>> # The following creates the query as
    >>> # UPDATE user SET m_name = 'John Doe', m_email = 'john.doe@example.com' WHERE m_id = 1 LIMIT 1
    ... user.update(where_equals=[user.key.m_id])
    """

    def __init__(self):
        self.__cls = self.__class__
        self.changed_props = []
        self.all_props = []
        self.__getting_prop_name = False
        setattr(self, '__sql_entity_init_called__', True)
        self.__generate_properties()
        self._set_all_props()
        self._sql: Optional[SQL] = None
        super().__init__()

    @property
    @abstractmethod
    def db_table_name(self) -> str:
        """
        Property Name: db_table_name
        -----------------------------
        The `db_table_name` property is an abstract property that should be implemented in the subclass.
        It should return the name of the database table that the entity represents.

        Usage Example:
        --------------
        >>> class User(SQLEntity):
        ...     @property
        ...     def db_table_name(self):
        ...         return 'user'
        """
        pass

    @property
    def key(self: SQLEntityChildType) -> SQLEntityChildType:
        """
        Temporary Property Name Access:
        -------------------------------
        To temporarily access the name of a property instead of its value, you can use the `key` attribute.

        Usage Example:
        --------------
        >>> user = User()
        >>> user.m_name # Returns the value of the m_name property ('John Doe')
        >>> user.key.m_name # Returns the name of the m_name property ('m_name')
        """

        self.__getting_prop_name = True
        return self

    def reset(self):
        """
        Method Name: reset
        ------------------
        The `reset` method resets the entity by clearing the changed properties list.

        Usage Example:
        --------------
        >>> user = User()
        >>> user.m_name = "John Doe"
        >>> user.m_email = "john@gmail.com"
        >>> user.reset()
        >>> user.changed_props # Returns an empty list ([])
        >>> user.m_name # Returns None
        """
        self.changed_props = []
        [setattr(self, Func.get_attr_custom_storage_name(prop), None) for prop in self.all_props]
        if self._sql:
            self._sql.rollback()

    def __create_property(self, attr_name):
        def getter(self):
            if self.__getting_prop_name:
                return attr_name
            return getattr(self, '__' + attr_name)

        def setter(self, value):
            if not self.__getting_prop_name:
                self.changed_props.append(attr_name)
            setattr(self, '__' + attr_name, value)

        return property(getter, setter)

    def _set_all_props(self):
        self.all_props = [name for name in self.__get_attribute_names()]

    def get_unchanged_props_names(self):
        return [prop for prop in self.all_props if prop not in self.changed_props]

    def get_changed_props_names(self):
        return self.changed_props

    def get_all_props_names(self):
        return self.all_props

    def get_unchanged_props_vals(self):
        return [getattr(self, prop) for prop in self.get_unchanged_props_names()]

    def get_changed_props_vals(self):
        return [getattr(self, prop) for prop in self.get_changed_props_names()]

    def get_all_props_vals(self):
        return [getattr(self, prop) for prop in self.get_all_props_names()]

    def get_col_vals(self, cols):
        if not cols:
            return []
        return [getattr(self, col) for col in cols]

    def remove_from_changed_prop(self, props):
        if not props:
            return []
        for prop in props:
            if prop in self.changed_props:
                self.changed_props.remove(prop)
        return props

    def __generate_properties(self):
        for attr_name in self.__get_attribute_names():
            setattr(self.__cls, attr_name, self.__create_property(attr_name))

    def __get_attribute_names(self):
        return [name for name in dir(self) if name.startswith('m_')]

    def __create_property(self, attr_name):
        attr_storage_name = Func.get_attr_custom_storage_name(attr_name)
        setattr(self, attr_storage_name, getattr(self, attr_name))

        def getter(self):
            if self.__getting_prop_name:
                self.__getting_prop_name = False
                return attr_name
            return getattr(self, attr_storage_name)

        def setter(self, value):
            setattr(self, attr_storage_name, value)
            if hasattr(self, '__sql_entity_init_called__') and attr_name not in self.changed_props:
                self.changed_props.append(attr_name)

        return property(getter, setter)

    def select(
        self,
        select_cols: list[Any] | Literal['UnChanged'] | Literal['All'] = 'UnChanged',
        where_equals: list[Any] | Literal['Changed'] = 'Changed',
        where_not_equals: list[Any] = None,
        where_in: list[Any] = None,
        where_not_in: list[Any] = None,
        where_like: list[Any] = None,
        where_not_like: list[Any] = None,
        where_greater_than: list[Any] = None,
        where_less_than: list[Any] = None,
        where_greater_than_or_equal: list[Any] = None,
        where_less_than_or_equal: list[Any] = None,
        where_is_null: list[Any] = None,
        where_is_not_null: list[Any] = None,
        where_between: list[Any] = None,
        where_not_between: list[Any] = None,
        _limit: int = 1,
        _offset: int = 0,
        _order_by: Any = None,
        _desc: bool = False,
        reset_changed_props: bool = True,
    ) -> list[dict[str, Any]]:
        select_cols_str = self.__build_select_cols(select_cols)
        where_equals, where_vals = self.__build_where_cols(
            where_equals,
            where_not_equals,
            where_in,
            where_not_in,
            where_like,
            where_not_like,
            where_greater_than,
            where_less_than,
            where_greater_than_or_equal,
            where_less_than_or_equal,
            where_is_null,
            where_is_not_null,
            where_between,
            where_not_between
        )
        _order_by_str = self.__build_order_by(_order_by, _desc)

        _query = (f"SELECT {select_cols_str} FROM {self.db_table_name} {where_equals} "
                  f"LIMIT {_limit} OFFSET {_offset} {_order_by_str} ")

        if reset_changed_props:
            self.changed_props = []

        if not self._sql:
            self._sql = SQL()
        return self._sql.execute(_query, [*where_vals])

    def load(
        self,
        select_cols: list[Any] | Literal['UnChanged'] | Literal['All'] = 'UnChanged',
        where_equals: list[Any] | Literal['Changed'] = 'Changed',
        where_not_equals: list[Any] = None,
        where_in: list[Any] = None,
        where_not_in: list[Any] = None,
        where_like: list[Any] = None,
        where_not_like: list[Any] = None,
        where_greater_than: list[Any] = None,
        where_less_than: list[Any] = None,
        where_greater_than_or_equal: list[Any] = None,
        where_less_than_or_equal: list[Any] = None,
        where_is_null: list[Any] = None,
        where_is_not_null: list[Any] = None,
        where_between: list[Any] = None,
        where_not_between: list[Any] = None,
        _offset: int = 0,
        _order_by: Any = None,
        _desc: bool = False,
        reset_changed_props: bool = True,
    ) -> bool:
        res = self.select(
            select_cols,
            where_equals,
            where_not_equals,
            where_in,
            where_not_in,
            where_like,
            where_not_like,
            where_greater_than,
            where_less_than,
            where_greater_than_or_equal,
            where_less_than_or_equal,
            where_is_null,
            where_is_not_null,
            where_between,
            where_not_between,
            1,
            _offset,
            _order_by,
            _desc,
            reset_changed_props,
        )
        if not res:
            return False

        self.__set_values(res[0])

        if reset_changed_props:
            self.changed_props = []

        return True

    def __set_values(self, values):
        for key, value in values.items():
            setattr(self, key, value)

    def count(
        self,
        where_equals: list[Any] | Literal['Changed'] = 'Changed',
        where_not_equals: list[Any] = None,
        where_in: list[Any] = None,
        where_not_in: list[Any] = None,
        where_like: list[Any] = None,
        where_not_like: list[Any] = None,
        where_greater_than: list[Any] = None,
        where_less_than: list[Any] = None,
        where_greater_than_or_equal: list[Any] = None,
        where_less_than_or_equal: list[Any] = None,
        where_is_null: list[Any] = None,
        where_is_not_null: list[Any] = None,
        where_between: list[Any] = None,
        where_not_between: list[Any] = None,
        _limit: int = -1,
        _offset: int = 0,
        reset_changed_props: bool = True,
    ) -> int:
        where_equals, where_vals = self.__build_where_cols(
            where_equals,
            where_not_equals,
            where_in,
            where_not_in,
            where_like,
            where_not_like,
            where_greater_than,
            where_less_than,
            where_greater_than_or_equal,
            where_less_than_or_equal,
            where_is_null,
            where_is_not_null,
            where_between,
            where_not_between
        )
        _query = f"SELECT COUNT(*) FROM {self.db_table_name} {where_equals}"

        if reset_changed_props:
            self.changed_props = []

        if not self._sql:
            self._sql = SQL()
        res = self._sql.execute(_query, [*where_vals])
        return res[0]['COUNT(*)']

    def exists(
        self,
        where_equals: list[Any] | Literal['Changed'] = 'Changed',
        where_not_equals: list[Any] = None,
        where_in: list[Any] = None,
        where_not_in: list[Any] = None,
        where_like: list[Any] = None,
        where_not_like: list[Any] = None,
        where_greater_than: list[Any] = None,
        where_less_than: list[Any] = None,
        where_greater_than_or_equal: list[Any] = None,
        where_less_than_or_equal: list[Any] = None,
        where_is_null: list[Any] = None,
        where_is_not_null: list[Any] = None,
        where_between: list[Any] = None,
        where_not_between: list[Any] = None,
        reset_changed_props: bool = True,
    ) -> bool:
        where_equals, where_vals = self.__build_where_cols(
            where_equals,
            where_not_equals,
            where_in,
            where_not_in,
            where_like,
            where_not_like,
            where_greater_than,
            where_less_than,
            where_greater_than_or_equal,
            where_less_than_or_equal,
            where_is_null,
            where_is_not_null,
            where_between,
            where_not_between
        )
        _query = f"SELECT 1 FROM {self.db_table_name} {where_equals} LIMIT 1"

        if reset_changed_props:
            self.changed_props = []

        if not self._sql:
            self._sql = SQL()
        res = self._sql.execute(_query, [*where_vals])
        return bool(res)

    def delete(
        self,
        where_equals: list[Any] | Literal['Changed'] = 'Changed',
        where_not_equals: list[Any] = None,
        where_in: list[Any] = None,
        where_not_in: list[Any] = None,
        where_like: list[Any] = None,
        where_not_like: list[Any] = None,
        where_greater_than: list[Any] = None,
        where_less_than: list[Any] = None,
        where_greater_than_or_equal: list[Any] = None,
        where_less_than_or_equal: list[Any] = None,
        where_is_null: list[Any] = None,
        where_is_not_null: list[Any] = None,
        where_between: list[Any] = None,
        where_not_between: list[Any] = None,
        _limit: int = 1,
        _offset: int = -1,
        _order_by: str = None,
        _desc: bool = False,
        reset_changed_props: bool = True,
    ) -> bool:
        where_equals, where_vals = self.__build_where_cols(
            where_equals,
            where_not_equals,
            where_in,
            where_not_in,
            where_like,
            where_not_like,
            where_greater_than,
            where_less_than,
            where_greater_than_or_equal,
            where_less_than_or_equal,
            where_is_null,
            where_is_not_null,
            where_between,
            where_not_between
        )
        _order_by_str = SQLEntity.__build_order_by(_order_by, _desc)

        _query = f"DELETE FROM {self.db_table_name} {where_equals} LIMIT {_limit} OFFSET {_offset} {_order_by_str} "

        if reset_changed_props:
            self.changed_props = []

        if not self._sql:
            self._sql = SQL()
        return bool(self._sql.execute(_query, where_vals))

    def insert(
        self,
        insert_cols: list[Any] | Literal['Changed'] = 'Changed',
        reset_changed_props: bool = True,
        load_inserted_id_to: str = None,
    ) -> int:
        insert_cols, insert_placeholders, insert_vals = self.__build_insert_cols(insert_cols)

        _query = f"INSERT INTO {self.db_table_name} ({insert_cols}) VALUES ({insert_placeholders})"

        if reset_changed_props:
            self.changed_props = []

        if not self._sql:
            self._sql = SQL()
        _last_inserted_id = self._sql.execute(_query, insert_vals)
        if load_inserted_id_to:
            setattr(self, load_inserted_id_to, _last_inserted_id)
        return _last_inserted_id

    def update(
        self,
        set_cols: list[Any] | Literal['Changed'] = 'Changed',
        where_equals: list[Any] | Literal['m_id'] = 'm_id',
        where_not_equals: list[Any] = None,
        where_in: list[Any] = None,
        where_not_in: list[Any] = None,
        where_like: list[Any] = None,
        where_not_like: list[Any] = None,
        where_greater_than: list[Any] = None,
        where_less_than: list[Any] = None,
        where_greater_than_or_equal: list[Any] = None,
        where_less_than_or_equal: list[Any] = None,
        where_is_null: list[Any] = None,
        where_is_not_null: list[Any] = None,
        where_between: list[Any] = None,
        where_not_between: list[Any] = None,
        _limit: int = 1,
        reset_changed_props: bool = True,
    ) -> bool:
        if where_equals == 'm_id':
            where_equals = ['m_id']

        pre_removed_cols = []
        if set_cols == 'Changed' and 'm_id' in self.changed_props:
            pre_removed_cols.append('m_id')
            self.changed_props.remove('m_id')

        pre_removed_cols.extend(self.remove_from_changed_prop(where_equals))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_not_equals))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_in))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_not_in))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_like))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_not_like))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_greater_than))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_less_than))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_greater_than_or_equal))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_less_than_or_equal))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_is_null))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_is_not_null))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_between))
        pre_removed_cols.extend(self.remove_from_changed_prop(where_not_between))

        set_cols_str, set_vals = self.__build_set_cols(set_cols)
        where_equals, where_vals = self.__build_where_cols(
            where_equals,
            where_not_equals,
            where_in,
            where_not_in,
            where_like,
            where_not_like,
            where_greater_than,
            where_less_than,
            where_greater_than_or_equal,
            where_less_than_or_equal,
            where_is_null,
            where_is_not_null,
            where_between,
            where_not_between
        )

        _query = f"UPDATE {self.db_table_name} SET {set_cols_str} {where_equals} LIMIT {_limit}"

        if reset_changed_props:
            self.changed_props = []
        else:
            self.changed_props.extend(pre_removed_cols)

        if not self._sql:
            self._sql = SQL()
        return bool(self._sql.execute(_query, set_vals + where_vals))

    def commit(self):
        self._sql.commit()

    def __build_set_cols(self, cols):
        if cols == 'Changed':
            cols = self.get_changed_props_names()
            if not cols:
                raise ValueError('No changed properties to update')
        set_cols = ', '.join([f"{col} = %s" for col in cols])
        set_vals = self.get_changed_props_vals()
        return set_cols, set_vals

    def __build_insert_cols(self, cols):
        if cols == 'Changed':
            cols = self.get_changed_props_names()
            if not cols:
                raise ValueError('No changed properties to insert')
        col_names = ', '.join(cols)
        col_placeholders = ', '.join(['%s'] * len(cols))
        return col_names, col_placeholders, self.get_changed_props_vals()

    def __build_where_cols(
        self,
        equal_cols,
        not_equal_cols,
        in_cols,
        not_in_cols,
        like_cols,
        not_like_cols,
        greater_than_cols,
        less_than_cols,
        greater_than_or_equal_cols,
        less_than_or_equal_cols,
        is_null_cols,
        is_not_null_cols,
        between_cols,
        not_between_cols
    ):
        col_vals = []
        _ = ''
        if equal_cols == 'Changed':
            equal_cols = self.get_changed_props_names()

        _ = self.__build_where_internal_cols(_, equal_cols, '{} = %s')
        col_vals.extend(self.get_col_vals(equal_cols))

        _ = self.__build_where_internal_cols(_, not_equal_cols, '{} != %s')
        col_vals.extend(self.get_col_vals(not_equal_cols))

        _ = self.__build_where_internal_cols(_, in_cols, '{} IN (%s)')
        col_vals.extend(self.get_col_vals(in_cols))

        _ = self.__build_where_internal_cols(_, not_in_cols, '{} NOT IN (%s)')
        col_vals.extend(self.get_col_vals(not_in_cols))

        _ = self.__build_where_internal_cols(_, like_cols, '{} LIKE %s')
        col_vals.extend(self.get_col_vals(like_cols))

        _ = self.__build_where_internal_cols(_, not_like_cols, '{} NOT LIKE %s')
        col_vals.extend(self.get_col_vals(not_like_cols))

        _ = self.__build_where_internal_cols(_, greater_than_cols, '{} > %s')
        col_vals.extend(self.get_col_vals(greater_than_cols))

        _ = self.__build_where_internal_cols(_, less_than_cols, '{} < %s')
        col_vals.extend(self.get_col_vals(less_than_cols))

        _ = self.__build_where_internal_cols(_, greater_than_or_equal_cols, '{} >= %s')
        col_vals.extend(self.get_col_vals(greater_than_or_equal_cols))

        _ = self.__build_where_internal_cols(_, less_than_or_equal_cols, '{} <= %s')
        col_vals.extend(self.get_col_vals(less_than_or_equal_cols))

        _ = self.__build_where_internal_cols(_, is_null_cols, '{} IS NULL')

        _ = self.__build_where_internal_cols(_, is_not_null_cols, '{} IS NOT NULL')

        _ = self.__build_where_internal_cols(_, between_cols, '{} BETWEEN %s')
        col_vals.extend(self.get_col_vals(between_cols))

        _ = self.__build_where_internal_cols(_, not_between_cols, '{} NOT BETWEEN %s')
        col_vals.extend(self.get_col_vals(not_between_cols))

        _ = 'WHERE ' + _ if _ else ''
        return _, col_vals

    def __build_where_internal_cols(self, pre_query: str, where_cols: list, format_str: str):
        if not where_cols:
            return pre_query
        _ = ' AND '.join([format_str.format(_) for _ in where_cols])
        if _ and pre_query:
            _ = pre_query + ' AND ' + _
        if _:
            return _
        return pre_query

    def __build_select_cols(self, select_cols):
        if select_cols == 'All':
            return '*'
        elif select_cols == 'UnChanged':
            select_cols = self.get_unchanged_props_names()
            if not select_cols:
                return '*'
        _ = ', '.join(select_cols)
        return _

    @staticmethod
    def __build_order_by(order_by: Any, desc: bool):
        if not order_by:
            return ''
        return f'ORDER BY {order_by} {"DESC" if desc else "ASC"}' if order_by else ''
