from typing import Any, Optional

from mysql import connector
from mysql.connector.cursor import MySQLCursor

from ..funcs.funcs import Func


class SQL:
    def __init__(self):
        self.connection = connector.connect(
            host='localhost',
            user='root',
            password='',
            database='ai_disease_predictor'
        )
        self.cursor: Optional[MySQLCursor] = None

    def execute(self, query: str, params: list = []) -> list[dict[str, Any]] | bool | int:
        self.cursor = self.connection.cursor()
        new_params = []
        for i, param in enumerate(params):
            if isinstance(param, list):
                _ = ", ".join(['%s' for _ in param])
                query = Func.SqlHelpers.replace_nth_occurrence_(query, '%s', _, len(new_params))
                for new_param in param:
                    new_params.append(new_param)
            else:
                new_params.append(param)
        if Func.SqlHelpers.nb_of_coming_queries_to_print > 0:
            print(f'Query: {query}')
            print(f'Params: {new_params}')
            Func.SqlHelpers.nb_of_coming_queries_to_print -= 1

        self.cursor.execute(query, new_params)
        if 'select' in query.lower():
            return Func.SqlHelpers.fetch_all_as_dicts(self.cursor)
        else:
            if 'insert' in query.lower():
                return self.cursor.lastrowid
            return True

    def commit(self):
        self.connection.commit()
