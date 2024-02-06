from typing import Any, Literal

from ..funcs import Func
from ..sql.sql import SQL


class SQLEntity:
    def __init__(self):
        self.__cls = self.__class__
        self.changed_props = []
        self.all_props = []
        self.__getting_prop_name = False
        setattr(self, '__sql_entity_init_called__', True)
        self.__generate_properties()
        super().__init__()

    @property
    def key(self):
        self.__getting_prop_name = True
        return self

    def _set_all_props(self):
        self.all_props = [getattr(self, name) for name in self.__get_attribute_names()]

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
        _offset: int = -1,
        _order_by: Any = None,
        _desc: bool = False,
        reset_changed_props: bool = True,
    ):
        _cls = self.__cls.__name__.lower()

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

        _query = f"SELECT {select_cols_str} FROM {_cls} {where_equals} LIMIT {_limit} OFFSET {_offset} {_order_by_str} "

        if reset_changed_props:
            self.changed_props = []

        sql = SQL()
        return sql.execute(_query, [*where_vals])

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
    ):
        _cls = self.__cls.__name__.lower()

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

        _query = f"DELETE FROM {_cls} {where_equals} LIMIT {_limit} OFFSET {_offset} {_order_by_str} "

        if reset_changed_props:
            self.changed_props = []

        sql = SQL()
        return sql.execute(_query, where_vals)

    def insert(
        self,
        insert_cols: list[Any] | Literal['Changed'] = 'Changed',
        reset_changed_props: bool = True,
    ):
        _cls = self.__cls.__name__.lower()
        insert_cols, insert_placeholders, insert_vals = self.__build_insert_cols(insert_cols)

        _query = f"INSERT INTO {_cls} ({insert_cols}) VALUES ({insert_placeholders})"

        if reset_changed_props:
            self.changed_props = []

        sql = SQL()
        return sql.execute(_query, insert_vals)

    def update(
        self,
        set_cols: list[Any] | Literal['Changed'] = 'Changed',
        where_equals: list[Any] = ['m_id'],
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
    ):
        _cls = self.__cls.__name__.lower()

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

        _query = f"UPDATE {_cls} SET {set_cols_str} {where_equals} LIMIT {_limit}"

        if reset_changed_props:
            self.changed_props = []
        else:
            self.changed_props.extend(pre_removed_cols)

        sql = SQL()
        return sql.execute(_query, set_vals + where_vals)

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
        col_placeholders = ', '.join(['%'] * len(cols))
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
            select_cols = self.get_unchanged_props_vals()
            if not select_cols:
                return '*'
        _ = ', '.join(select_cols)
        return _

    @staticmethod
    def __build_order_by(order_by: Any, desc: bool):
        if not order_by:
            return ''
        return f'ORDER BY {order_by} {"DESC" if desc else "ASC"}' if order_by else ''
