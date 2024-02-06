from typing import Any


class Func:
    __uuid_count = 0

    @staticmethod
    def get_uuid():
        Func.__uuid_count += 1
        return f'uuid_{Func.__uuid_count}'

    @staticmethod
    def assign_uui(obj):
        obj.__name__ = Func.get_uuid()
        return obj.__name__

    @staticmethod
    def get_attr_starts_with(obj, attr: str):
        return [i for i in dir(obj) if i.startswith(attr)]

    @staticmethod
    def get_attr_custom_storage_name(attr: str):
        return f'_custom_storage_{attr}'

    @staticmethod
    def set_attr_to_builtin_type(val, attr_name: str, attr_val: type):
        class tmp(type(val)):
            def attr(self, n, v):
                setattr(self, n, v)
                return self

        return tmp(val).attr(attr_name, attr_val)

    class SqlHelpers:
        nb_of_coming_queries_to_print = 0

        @staticmethod
        def replace_nth_occurrence_(input_str, substring, replacement, n):
            start_index = input_str.find(substring)
            while start_index >= 0 and n > 0:
                start_index = input_str.find(substring, start_index + 1)
                n -= 1

            if start_index >= 0:
                return input_str[:start_index] + replacement + input_str[start_index + len(substring):]
            else:
                return input_str

        @staticmethod
        def fetch_all_as_dicts(cursor) -> list[dict[str, Any]]:
            cols_names = cursor.column_names
            result = []
            for row in cursor.fetchall():
                curr_obj = {}
                for i, col_name in enumerate(cols_names):
                    curr_obj[col_name] = row[i]
                result.append(curr_obj)
            return result
