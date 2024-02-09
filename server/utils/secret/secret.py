from __future__ import annotations

import jwt

from ..env import Env


class Secret:
    @staticmethod
    def encode_token(payload: dict) -> str | False:
        try:
            return jwt.encode(payload, Env.get('SECRET_KEY'), algorithm="HS256")
        except:
            return False

    @staticmethod
    def decode_token(token: str) -> dict | False:
        try:
            return jwt.decode(token, Env.get('SECRET_KEY'), algorithms=['HS256'])
        except:
            return False
