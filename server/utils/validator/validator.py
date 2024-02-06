from __future__ import annotations

import html
import re
from inspect import FullArgSpec, getfullargspec
from typing import Any, Callable, Literal, Optional, Union

import bleach
from bleach.css_sanitizer import CSSSanitizer
from bs4 import BeautifulSoup

from ..funcs import Func
from ..request import App


class Validator:
    @staticmethod
    def And(*validator_func: Callable[[Any], bool]):
        """
        Combines multiple validator functions like an `And` operator.

        Combines multiple validator functions like an `And` operator, into a single validator function that returns
        True if all the individual validator functions return True for the given value, and False otherwise.

        Parameters
        ----------
        `validator_func`: Callable[[Any], bool]
            Variable number of validator functions. Each function should take a single
            argument and return a boolean value.

        Returns
        -------
        Callable[[Any], bool]
            A new validator function that combines the behavior of all the input validator functions.

        Example:
            >>> class Person(Validator.PropertyTypeValidatorEntity):
            ...     def __init__(self):
            ...         self.m_age = Validator.PropertyValidatable(
            ...             Validator.And(
            ...                 Validator.Int(),
            ...                 Validator.MinVal(18),
            ...                 Validator.MaxVal(22)
            ...             )
            ...         )
            ...         super().__init__()

            >>> p = Person()
            >>> p.m_age = 19 # True
            >>> p.m_age = 24 # False

        """

        def _(val) -> bool:
            for func in validator_func:
                if not func(val):
                    return False
            return True

        _.__custom_str_format__ = f"({' And '.join(func.__custom_str_format__ for func in validator_func)})"
        return _

    @staticmethod
    def Or(*validator_func: Callable[[Any], bool]):
        def _(val) -> bool:
            for func in validator_func:
                if func(val):
                    return True
            return False

        _.__custom_str_format__ = f'Or({[func.__custom_str_format__ for func in validator_func]})'
        return _

    @staticmethod
    def Not(validator_func: Callable[[Any], bool]):
        def _(val) -> bool:
            return not validator_func(val)

        _.__custom_str_format__ = f'Not({validator_func.__custom_str_format__})'
        return _

    @staticmethod
    def Null():
        def _(val) -> bool:
            return val is None

        _.__custom_str_format__ = f'Null()'
        return _

    @staticmethod
    def Any():
        def _(val) -> bool:
            return True

        _.__custom_str_format__ = f'Any()'
        return _

    @staticmethod
    def Str():
        def _(val):
            return type(val) == str

        _.__custom_str_format__ = f'Str()'
        return _

    @staticmethod
    def MinLen(min_len: int):
        def _(val: str) -> bool:
            return len(val) >= min_len

        _.__custom_str_format__ = f'MinLen({min_len})'
        return _

    @staticmethod
    def MaxLen(max_len: int):
        def _(val: str) -> bool:
            return len(val) < max_len

        _.__custom_str_format__ = f'MaxLen({max_len})'
        return _

    @staticmethod
    def List():
        def _(val: str) -> bool:
            return type(val) == list

        _.__custom_str_format__ = f'List()'
        return _

    @staticmethod
    def MinVal(min_val: int):
        def _(val) -> bool:
            return val >= min_val

        _.__custom_str_format__ = f'MinVal({min_val})'
        return _

    @staticmethod
    def MaxVal(max_val: int):
        def _(val) -> bool:
            return val < max_val

        _.__custom_str_format__ = f'MaxVal({max_val})'
        return _

    @staticmethod
    def Int():
        def _(val) -> bool:
            return type(val) == int

        _.__custom_str_format__ = f'Int()'
        return _

    @staticmethod
    def Float():
        def _(val) -> bool:
            return type(val) == float

        _.__custom_str_format__ = f'Float()'
        return _

    @staticmethod
    def Bool():
        def _(val) -> bool:
            return type(val) == bool

        _.__custom_str_format__ = f'Bool()'
        return _

    @staticmethod
    def Username():
        def _(val) -> bool:
            if (type(val) != str
                    or not 3 <= len(val) <= 15
                    or not re.match(r'^[a-zA-Z0-9_-]+$', val)
                    or val.startswith('_')
                    or val.startswith('-')
                    or val.endswith('_')
                    or val.endswith('-')
                    or '__' in val
                    or '--' in val):
                return False
            return True

        _.__custom_str_format__ = f'Username(Letters: A-Z, a-z and Numbers: 0-9 and Underscore (_) and Hyphen (-))'
        return _

    @staticmethod
    def Email():
        def _(val) -> bool:
            if (type(val) != str
                    or not re.match(r'^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$', val)):
                return False
            return True

        _.__custom_str_format__ = f'Email()'
        return _

    @staticmethod
    def Password():
        def _(val) -> bool:
            if (not isinstance(val, str)
                    or not 8 <= len(val) < 30  # You can adjust the length requirements as needed
                    or not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_-]+$', val)):
                # or not re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]?)[A-Za-z\d@$!%*?&_-]+$', val)):
                return False
            return True

        _.__custom_str_format__ = (f'Password (Length: 8-30, Must contain at least one uppercase letter, '
                                   f'one lowercase letter, one digit. Special characters: @$!%*?& are optional.)')
        return _

    @staticmethod
    def TextInHtmlMaxLen(max_len: int):
        def _(val: str) -> bool:
            soup = BeautifulSoup(val, 'html.parser')
            text = soup.get_text()
            text = html.unescape(text)
            return len(text) < max_len

        _.__custom_str_format__ = f'TextInHtmlMaxLen({max_len})'
        return _

    @staticmethod
    def TextInHtmlMinLen(min_len: int):
        def _(val: str) -> bool:
            soup = BeautifulSoup(val, 'html.parser')
            text = soup.get_text()
            text = html.unescape(text)
            return len(text) >= min_len

        _.__custom_str_format__ = f'TextInHtmlMinLen({min_len})'
        return _

    @staticmethod
    def neutralize_js_injection(
        allowed_tags: set[str] = set(), allowed_attributes: dict[str, list[str]] = dict(),
        allowed_css_props: Optional[list[str]] = None
    ):
        def decorator(func: Callable):
            def decorated(*args, **kwargs):
                args = list(args)
                css_sanitizer = CSSSanitizer(allowed_css_properties=allowed_css_props)
                for i in range(len(args)):
                    if type(args[i]) is str:
                        if allowed_css_props:
                            args[i] = bleach.clean(
                                args[i], tags=allowed_tags, attributes=allowed_attributes,
                                css_sanitizer=css_sanitizer
                            )
                        else:
                            args[i] = bleach.clean(args[i], tags=allowed_tags, attributes=allowed_attributes)
                for key in kwargs:
                    if allowed_css_props:
                        kwargs[key] = bleach.clean(
                            kwargs[key], tags=allowed_tags, attributes=allowed_attributes,
                            css_sanitizer=css_sanitizer
                        )
                    else:
                        kwargs[key] = bleach.clean(kwargs[key], tags=allowed_tags, attributes=allowed_attributes)
                args = tuple(args)
                return func(*args, **kwargs)

            return decorated

        return decorator

    @staticmethod
    def validate_param_types(func: Callable):
        func_name = func.__qualname__

        def decorated(*params, **kw_params):
            args_specs: FullArgSpec = getfullargspec(func)
            args_types = args_specs.annotations
            args_defaults = args_specs.defaults
            var_args = args_specs.varargs
            kw_only_args_defaults = args_specs.kwonlydefaults or {}.keys()
            var_kw_args = args_specs.varkw
            args = args_specs.args
            kw_only_args = args_specs.kwonlyargs

            passed = []
            for val in params:
                key = args[0] if len(args) else None
                if not key:
                    key = var_args
                else:
                    if key in passed:
                        raise
                if key in args_types:
                    curr_type = args_types[key]
                    if not curr_type(val):
                        type_repr = curr_type.__custom_str_format__
                        return App.Res.frontend_error(
                            f'Type does not match', f'key = [ {key} ]', f'expected = [ {type_repr} ]',
                            f'given = [ {type(val)} ]', f'val = [ {val} ]', f'func_name = [ {func_name} ]',
                        )
                passed.append(args.pop(0)) if len(args) else None

            keys_to_remove = []
            for key in kw_params.keys():
                val = kw_params[key]
                if key not in kw_only_args and key not in args:
                    if key in passed:
                        return App.Res.server_error(f'Multiple values', f' key = [ {key} ]', f'func = [ {func_name} ]')
                    else:
                        key = var_kw_args
                if key in args_types:
                    if not args_types[key](val):
                        curr_type = args_types[key]
                        type_repr = curr_type.__custom_str_format__
                        return App.Res.frontend_error(
                            f'Type does not match', f'key = [ {key} ]', f'expected = [ {type_repr} ]',
                            f'given = [ {type(val)} ]', f'val = [ {val} ]', f'func_name = [ {func_name} ]',
                        )
                passed.append(key)
                keys_to_remove.append(key)
            for key in keys_to_remove:
                try:
                    args.remove(key)
                except KeyError:
                    try:
                        kw_only_args.remove(key)
                    except KeyError:
                        pass

            keys_to_remove = []
            for key in args:
                if key in args_defaults:
                    keys_to_remove.append(key)
            [args.remove(key) for key in keys_to_remove]

            for key in kw_only_args:
                if key in kw_only_args_defaults:
                    keys_to_remove.append(key)
            [kw_only_args.remove(key) for key in keys_to_remove]

            if args or kw_only_args:
                return App.Res.server_error(
                    f'Missing value', f'key = [ {args} ] or [ {kw_only_args} ]', f'func = [ {func_name} ]'
                )
            return func(*params, **kw_params)

        return decorated

    class PropertyValidatable:
        def __init__(self, func: Callable[[Any], bool]):
            self.validate_func = func

    class PropertyTypeValidatorEntity:
        """
        A class that provides property validation functionality.

        Usage:
        1. Create an instance of PropertyTypeValidatorEntity.
        2. Define properties with validation using the PropertyValidatable class.
        3. Call the set_validator_errors_type method to set the type of validation errors.
        4. Access and set the properties, which will trigger the validation.

        Example:
        ```
        class MyEntity(PropertyTypeValidatorEntity):
            m_name = Validator.StringValidator(min_length=1, max_length=100)

        entity = MyEntity()
        entity.set_validator_errors_type('FRONTEND')
        entity.name = 'John Doe'  # Valid value
        entity.name = ''  # Invalid value, will return a frontend error
        ```

        Attributes:
        - __property_validator_errors_type: The type of validation errors to be returned. Can be 'FRONTEND',
        'CLIENT', or 'BACKEND'.
        """

        def __init__(self):
            """
            Initializes the PropertyTypeValidatorEntity instance.

            This method generates the properties and sets the default validation error type to 'FRONTEND'.
            """
            self.__cls = self.__class__
            if not hasattr(self, '__property_type_validator_entity_init_called__'):
                self.__generate_properties()
                setattr(self, '__property_type_validator_entity_init_called__', True)
            self.__property_validator_errors_type: Union[Literal['FRONTEND', 'CLIENT', 'BACKEND']] = 'FRONTEND'
            super().__init__()

        def set_validator_errors_type(self, errors_type: Union[Literal['FRONTEND', 'CLIENT', 'BACKEND']]):
            """
            Sets the type of validation errors to be returned.
            If any validation error occurs, the error will be returned in the specified type.

            Args:
            - errors_type: The type of validation errors. Can be 'FRONTEND', 'CLIENT', or 'BACKEND'.
            """
            self.__property_validator_errors_type = errors_type

        def __generate_properties(self):
            """
            Generates the properties with validation.
            It wraps getters and setters of the properties with validation (if getters and setters exist).
            It creates default getters and setters for the properties that do not have them, and then wrap them with
            validation.

            This method iterates over the attributes of the class and creates properties for those that are instances of
            Validator.PropertyValidatable class.
            """
            for attr_name in self.__get_attribute_names():
                if not isinstance(getattr(self, attr_name), Validator.PropertyValidatable):
                    continue
                setattr(self.__cls, attr_name, self.__create_property(attr_name))

        def __get_attribute_names(self):
            """
            Returns a list of attribute names starting with 'm_'.

            Returns:
            - A list of attribute names.
            """
            return [name for name in dir(self) if name.startswith('m_')]

        def __create_property(self, attr_name):
            """
            Creates a property with getter and setter methods.
            Uses the getter and setter methods of the attribute if they exist, otherwise creates default methods.

            Args:
            - attr_name: The name of the attribute.

            Returns:
            - The created property.
            """
            attr_storage_name = Func.get_attr_custom_storage_name(attr_name)
            validator = getattr(self, attr_name)
            self.__get_property_getter(attr_name)
            fget = self.__get_property_getter(attr_name)
            fset = self.__get_property_setter(attr_name)

            def getter(self):
                """
                Getter method for the property.

                Returns:
                - The value of the property.
                """
                if not hasattr(self, '__property_type_validator_entity_init_called__'):
                    pass
                return fget(self)

            def setter(self, value):
                """
                Setter method for the property.

                Args:
                - value: The value to be set.

                Returns:
                - The validation error or None.
                """
                if not hasattr(self, '__property_type_validator_entity_init_called__'):
                    fset(self, value)
                    return

                if not validator.validate_func(value):
                    if self.__property_validator_errors_type == 'FRONTEND':
                        return App.Res.frontend_error(
                            f'Type validation failed',
                            f'key={attr_name}',
                            f'expected={validator.validate_func.__custom_str_format__}',
                            f'given={type(value)}',
                            f'val={value}',
                            f'class_name={self.__class__.__name__}'
                        )
                    elif self.__property_validator_errors_type == 'BACKEND':
                        return App.Res.server_error(
                            f'Type validation failed',
                            f'key={attr_name}',
                            f'expected={validator.validate_func.__custom_str_format__}',
                            f'given={type(value)}',
                            f'val={value}',
                            f'class_name={self.__class__.__name__}'
                        )
                    elif self.__property_validator_errors_type == 'CLIENT':
                        return App.Res.client_error(
                            App.Res.CustomErrorCode.INVALID_VALUE,
                            f'Type validation failed',
                            f'key={attr_name}',
                            f'expected={validator.validate_func.__custom_str_format__}',
                            f'given={type(value)}',
                            f'val={value}',
                            f'class_name={self.__class__.__name__}'
                        )
                    else:
                        return
                fset(self, value)
                return

            return property(getter, setter)

        def __get_property_getter(self, attr_name):
            """
            Returns the getter method for the property.

            Args:
            - attr_name: The name of the attribute.

            Returns:
            - The getter method.
            """
            try:
                fget = getattr(self.__class__, attr_name).fget
            except:
                def fget(self):
                    return getattr(self, Func.get_attr_custom_storage_name(attr_name))
            return fget

        def __get_property_setter(self, attr_name):
            """
            Returns the setter method for the property.

            Args:
            - attr_name: The name of the attribute.

            Returns:
            - The setter method.
            """
            try:
                fset = getattr(self.__class__, attr_name).fset
            except:
                def fset(self, value):
                    return setattr(self, Func.get_attr_custom_storage_name(attr_name), value)
            return fset
