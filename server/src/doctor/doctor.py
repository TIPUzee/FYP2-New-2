from __future__ import annotations

from typing import Optional

from flask import request

from utils import AccessControlledEntity, App, EmailBaseClass, Secret, SQLEntity, Validator as vld


class Doctor(SQLEntity, vld.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_id: Optional[int] = vld.validatable(vld.And(vld.Int(), vld.MinVal(0)))
        self.m_specialization_category_id: Optional[int] = vld.validatable(vld.And(vld.Int(), vld.MinVal(0)))
        self.m_email: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Email(), vld.MaxLen(64)))
        self.m_password: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.MinLen(8), vld.MaxLen(16), vld.Password()))
        self.m_name: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.MinLen(3), vld.MaxLen(32), vld.Name()))
        self.m_dob: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Date()))
        self.m_registration_time: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.DateTime()))
        self.m_whatsapp_number: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.Phone(), vld.MaxLen(16)))
        self.m_profile_pic_filename: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.MaxLen(256)))
        self.m_cover_pic_filename: Optional[str] = vld.validatable(vld.And(vld.Str(), vld.MaxLen(256)))
        self.m_wallet_amount: Optional[float] = vld.validatable(vld.And(vld.Float(), vld.MinVal(0)))
        self.m_max_meeting_duration: Optional[int] = vld.validatable(vld.And(vld.Int(), vld.MinVal(15), vld.MaxVal(120)))
        self.m_appointment_charges: Optional[int] = vld.validatable(vld.And(vld.Int(), vld.MinVal(0), vld.MaxVal(5000)))
        self.m_status: Optional[str] = vld.validatable(
            vld.And(
                vld.Str(),
                vld.In(
                    'NEW_ACCOUNT',
                    'ACCOUNT_SUSPENDED',
                    'APPROVAL_REQUESTED',
                    'APPROVAL_REJECTED',
                    'ACCOUNT_APPROVED'
                )
            )
        )
        self.m_status_change_time = vld.PropertyValidatable(vld.And(vld.Str(), vld.DateTime()))
        self.m_specialization = vld.PropertyValidatable(vld.And(vld.Str(), vld.MinLen(5), vld.MaxLen(44)))
        super().__init__()
        self.turn_on_validation()

    class AccountStatusEnum:
        NEW_ACCOUNT = 'NEW_ACCOUNT'
        ACCOUNT_SUSPENDED = 'ACCOUNT_SUSPENDED'
        APPROVAL_REQUESTED = 'APPROVAL_REQUESTED'
        APPROVAL_REJECTED = 'APPROVAL_REJECTED'
        ACCOUNT_APPROVED = 'ACCOUNT_APPROVED'

    @property
    def db_table_name(self) -> str:
        return 'doctors'

    class Login(AccessControlledEntity):
        def __init__(self):
            super().__init__()

        @staticmethod
        def get_representation_str() -> str:
            return 'Doctor Login Token'

        @staticmethod
        def gen_token(user: Doctor) -> str:
            from utils import Secret
            _ = Secret.encode_token({'m_id': user.m_id, 'role': 'doctor.login'})
            return f'Bearer {_}'

        @staticmethod
        def fetch_token() -> str | False:
            from flask import request
            return request.headers.get('Authorization', False)

        @staticmethod
        def parse_token(raw_token: str) -> str | False:
            from utils import Secret
            payload = Secret.decode_token(raw_token.split(' ')[1])
            if payload and payload['role'] == 'doctor.login':
                return payload
            return False

        @staticmethod
        def get_user(payload: dict) -> 'Doctor':
            d = Doctor()
            d.m_id = payload['m_id']
            if not d.load():
                return App.Res.unauthenticated(
                    'Account does not exist.',
                    desc='The doctor\'s account might have been deleted. Please contact support.'
                )
            if d.m_status == Doctor.AccountStatusEnum.ACCOUNT_SUSPENDED:
                return App.Res.unauthenticated(
                    'Account suspended.',
                    'The administrator has suspended your account. Please contact support.',
                    desc='The administration has suspended the doctor\'s account. Please contact support.'
                )
            return d

    class Register(AccessControlledEntity):
        def __init__(self):
            super().__init__()

        @staticmethod
        def send_mail(user: Doctor):
            EmailBaseClass.send(
                f'<p>Hii <a href="mail:{user.m_email}">{user.m_email}</a></p>',
                [user.m_email], 'Welcome to AI-Disease Predictor'
            )

        @staticmethod
        def get_representation_str() -> str:
            return 'Doctor Registration Token'

        @staticmethod
        def gen_token(user: Doctor) -> str:
            _ = Secret.encode_token(
                {
                    'm_name':             user.m_name,
                    'm_dob':             user.m_dob,
                    'm_whatsapp_number': user.m_whatsapp_number,
                    'm_email':           user.m_email,
                    'm_password':        user.m_password,
                    'role':              'doctor.register'
                }
            )
            return f'Bearer {_}'

        @staticmethod
        def fetch_token() -> str | False:
            return request.headers.get('Authorization', False)

        @staticmethod
        def parse_token(raw_token: str) -> str | False:
            payload = Secret.decode_token(raw_token.split(' ')[1])
            if payload and payload['role'] == 'doctor.register':
                return payload
            return False

        @staticmethod
        def get_user(payload: dict) -> Doctor:
            p1 = Doctor()
            p2 = Doctor()
            p1.m_email = payload['m_email']
            p2.m_whatsapp_number = payload['m_whatsapp_number']
            if p1.exists() or p2.exists():
                return App.Res.unauthenticated(
                    'User has already been registered.',
                    desc='The doctor\'s account have already been registered. Please contact support.'
                )

            p = Doctor()
            p.m_name = payload['m_name']
            p.m_dob = payload['m_dob']
            p.m_email = payload['m_email']
            p.m_password = payload['m_password']
            p.m_whatsapp_number = payload['m_whatsapp_number']
            return p
