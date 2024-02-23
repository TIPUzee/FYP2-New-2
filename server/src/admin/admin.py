from __future__ import annotations

from typing import Optional

from flask import request

from utils import AccessControlledEntity, Secret, SQLEntity, Validator as vld


class Admin(SQLEntity, vld.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_id: Optional[int] = vld.validatable(vld.And(vld.Int(), vld.MinVal(0)))
        self.m_email: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Email(), vld.MaxLen(64)))
        self.m_password: Optional[str] = vld.validatable(
            vld.And(vld.Str(), vld.MinLen(8), vld.MaxLen(16), vld.Password())
        )
        super().__init__()
        self.turn_on_validation()

    @property
    def db_table_name(self) -> str:
        return 'admins'

    class Login(AccessControlledEntity):
        def __init__(self):
            self.m_email = ''
            self.m_password = ''
            super().__init__()

        @staticmethod
        def get_representation_str() -> str:
            return 'Admin Login Token'

        @staticmethod
        def gen_token(user: Admin) -> str:
            _ = Secret.encode_token({'m_id': user.m_id, 'role': 'admin.login'})
            return f'Bearer {_}'

        @staticmethod
        def fetch_token() -> str | False:
            return request.headers.get('Authorization', False)

        @staticmethod
        def parse_token(raw_token: str) -> str | False:
            payload = Secret.decode_token(raw_token.split(' ')[1])
            if payload and payload['role'] == 'admin.login':
                return payload
            return False

        @staticmethod
        def get_user(payload: dict) -> 'Admin':
            a = Admin()
            a.m_id = payload['m_id']
            return a
