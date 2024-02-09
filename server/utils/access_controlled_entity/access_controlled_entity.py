from __future__ import annotations

from abc import ABC, abstractmethod
from typing import TypeVar

T = TypeVar('T', bound='AccessControlledEntity')


class AccessControlledEntity(ABC):
    def __init__(self):
        super().__init__()

    @staticmethod
    @abstractmethod
    def get_representation_str() -> str:
        pass

    @staticmethod
    @abstractmethod
    def gen_token(user: T) -> str:
        pass

    @staticmethod
    @abstractmethod
    def fetch_token() -> str | False:
        pass

    @staticmethod
    @abstractmethod
    def parse_token(raw_token: str) -> str | False:
        pass

    @staticmethod
    @abstractmethod
    def get_user(payload: dict) -> T | False:
        pass
