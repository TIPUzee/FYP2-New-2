from __future__ import annotations

from abc import ABC

from flask import request

from utils import AccessControlledEntity, Secret, Validator as Vld, SQLEntity, EmailBaseClass


class Patient(SQLEntity, Vld.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_id = Vld.PropertyValidatable(Vld.And(Vld.Int(), Vld.MinVal(0)))
        self.m_email = ''
        self.m_password = ''
        self.m_name = ''
        self.m_dob = ''
        self.m_whatsapp_number = ''
        self.m_registration_time = ''
        self.m_refundable_amount = ''
        self.m_status = ''
        super().__init__()

    class Login(AccessControlledEntity, EmailBaseClass, ABC):
        def __init__(self):
            self.m_email = ''
            self.m_password = ''
            super().__init__()

        def send_mail(self):
            super().send(f'<p>Hii <a href="mail:{self.m_email}">{self.m_email}</a></p>', [self.m_email], 'Welcome to AI-Disease Predictor')

        @staticmethod
        def get_representation_str() -> str:
            return 'Patient Login Token'

        @staticmethod
        def gen_token(user: Patient) -> str:
            _ = Secret.encode_token({'m_id': user.m_id, 'role': 'patient.login'})
            return f'Bearer {_}'

        @staticmethod
        def fetch_token() -> str | False:
            return request.headers.get('Authorization', False)

        @staticmethod
        def parse_token(raw_token: str) -> str | False:
            payload = Secret.decode_token(raw_token.split(' ')[1])
            if payload and payload['role'] == 'patient.login':
                return payload
            return False

        @staticmethod
        def get_user(payload: dict) -> 'Patient':
            p = Patient()
            p.m_id = payload['m_id']
            return p
