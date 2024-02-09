from __future__ import annotations

from flask import request

from utils import AccessControlledEntity, Secret, Validator as Vld


class Admin(Vld.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_id = Vld.PropertyValidatable(Vld.And(Vld.Int(), Vld.MinVal(0)))
        super().__init__()

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
