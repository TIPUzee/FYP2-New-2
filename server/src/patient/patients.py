from __future__ import annotations

from typing import Optional

from flask import request

from utils import AccessControlledEntity, App, EmailBaseClass, Secret, SQLEntity, Validator as vld


class Patient(SQLEntity, vld.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_id: Optional[int] = vld.validatable(vld.And(vld.Int(), vld.MinVal(0)))
        self.m_email: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Email(), vld.MaxLen(64)))
        self.m_password: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Password()))
        self.m_name: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.MinLen(3), vld.Name(), vld.MaxLen(32)))
        self.m_dob: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Date()))
        self.m_whatsapp_number: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Phone(), vld.MaxLen(16)))
        self.m_registration_time: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.DateTime()))
        self.m_refundable_amount: Optional[float] = vld.validatable(vld.And(vld.Float(), vld.MinVal(0)))
        self.m_status: Optional[str] = vld.validatable(
            vld.And(
                vld.Str(),
                vld.In(
                    'ACCOUNT_SUSPENDED',
                    'ACCOUNT_NOT_SUSPENDED',
                )
            )
        )
        super().__init__()
        self.turn_on_validation()

    @property
    def db_table_name(self) -> str:
        return 'patients'

    class AccountStatusEnum:
        ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED'
        ACCOUNT_NOT_SUSPENDED = 'ACCOUNT_NOT_SUSPENDED'

    class Login(AccessControlledEntity):
        def __init__(self):
            super().__init__()

        @staticmethod
        def send_mail(user: Patient):
            EmailBaseClass.send(
                f'<p>Hii <a href="mail:{user.m_email}">{user.m_email}</a></p>',
                [user.m_email], 'Welcome to AI-Disease Predictor'
            )

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
            if not p.load():
                return App.Res.unauthenticated(
                    'Account does not exist.',
                    desc='The patient\'s account might have been deleted. Please contact support.'
                )
            if p.m_status == Patient.AccountStatusEnum.ACCOUNT_SUSPENDED:
                return App.Res.unauthenticated(
                    'Account suspended.',
                    'The administrator has suspended your account. Please contact support.',
                    desc='The administration has suspended the patient\'s account. Please contact support.'
                )
            return p

    class Register(AccessControlledEntity):
        def __init__(self):
            super().__init__()

        @staticmethod
        def send_mail(user: Patient):
            EmailBaseClass.send(
                f'<p>Hii <a href="mail:{user.m_email}">{user.m_email}</a></p>',
                [user.m_email], 'Welcome to AI-Disease Predictor'
            )

        @staticmethod
        def get_representation_str() -> str:
            return 'Patient Registration Token'

        @staticmethod
        def gen_token(user: Patient) -> str:
            _ = Secret.encode_token(
                {
                    'm_name':             user.m_name,
                    'm_dob':             user.m_dob,
                    'm_whatsapp_number': user.m_whatsapp_number,
                    'm_email':           user.m_email,
                    'm_password':        user.m_password,
                    'role':              'patient.register'
                }
            )
            return f'Bearer {_}'

        @staticmethod
        def fetch_token() -> str | False:
            return request.headers.get('Authorization', False)

        @staticmethod
        def parse_token(raw_token: str) -> str | False:
            payload = Secret.decode_token(raw_token.split(' ')[1])
            if payload and payload['role'] == 'patient.register':
                return payload
            return False

        @staticmethod
        def get_user(payload: dict) -> 'Patient':
            p1 = Patient()
            p2 = Patient()
            p1.m_email = payload['m_email']
            p2.m_whatsapp_number = payload['m_whatsapp_number']
            if p1.exists() or p2.exists():
                return App.Res.unauthenticated(
                    'User has already been registered.',
                    desc='The patient\'s account have already been registered. Please contact support.'
                )

            p = Patient()
            p.m_name = payload['m_name']
            p.m_dob = payload['m_dob']
            p.m_email = payload['m_email']
            p.m_password = payload['m_password']
            p.m_whatsapp_number = payload['m_whatsapp_number']
            return p
