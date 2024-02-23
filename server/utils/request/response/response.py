from __future__ import annotations

import traceback
from enum import Enum
from typing import Literal, Optional, TypedDict

from flask import Response as FlaskResponse


class HTTPCode(Enum):
    OK = 200
    CREATED = 201
    ACCEPTED = 202
    NO_CONTENT = 204
    BAD_REQUEST = 400
    UNAUTHORIZED = 401
    FORBIDDEN = 403
    NOT_FOUND = 404
    PAYLOAD_TOO_LARGE = 413
    UNSUPPORTED_MEDIA_TYPE = 415
    TOO_MANY_REQUESTS = 429
    INTERNAL_SERVER_ERROR = 500
    BAD_GATEWAY = 502
    SERVICE_UNAVAILABLE = 503


class Reason(Enum):
    NONE = None
    SERVER = 'SERVER'
    CLIENT = 'CLIENT'
    FRONTEND = 'FRONTEND'


class Popup(TypedDict):
    type: Literal['success'] | Literal['error'] | Literal['warning'] | Literal['info']
    msg: str


class Response(Exception):
    HTTPCode = HTTPCode
    Reason = Reason

    def __init__(
        self,
        http_code: HTTPCode = HTTPCode.OK,
        reason: Reason = Reason.NONE,
        popups: Optional[list[Popup]] = None,
        desc: Optional[str] = None,
        _file: FlaskResponse = None,
        kwargs: Optional[dict] = None,
        secret_errors: Optional[list[str]] = None,
    ):
        self.http_code = http_code.value
        self.reason: str = reason.value
        self.popups = popups
        self.desc = desc
        self._file = _file
        self.kwargs = kwargs
        self.secret_errors = secret_errors
        super().__init__()

    @staticmethod
    def server_error(*messages):
        raise Response(
            http_code=Response.HTTPCode.INTERNAL_SERVER_ERROR,
            reason=Response.Reason.SERVER,
            secret_errors=[traceback.format_exc(), *messages] if traceback.format_exc() != '''NoneType: None
''' else messages
        )

    @staticmethod
    def client_error(*popups: Popup, desc: str):
        raise Response(
            http_code=Response.HTTPCode.BAD_REQUEST,
            reason=Response.Reason.CLIENT,
            popups=[*popups],
            desc=desc
        )

    @staticmethod
    def frontend_error(*msgs: str):
        raise Response(
            http_code=Response.HTTPCode.BAD_REQUEST,
            reason=Response.Reason.FRONTEND,
            secret_errors=list(msgs)
        )

    @staticmethod
    def ok(popups: list[str] = None, **data):
        raise Response(
            http_code=Response.HTTPCode.OK,
            reason=Response.Reason.NONE,
            popups=[{'type': 'success', 'msg': p} for p in popups] if popups else None,
            kwargs=data
        )

    @staticmethod
    def unauthenticated(
        *popups: str,
        desc: str = None,
        reason: Reason = Reason.CLIENT,
    ):
        raise Response(
            Response.HTTPCode.UNAUTHORIZED,
            reason=reason,
            popups=[{'type': 'error', 'msg': p} for p in popups] if popups else None,
            desc=desc
        )

    @staticmethod
    def send_file(file: FlaskResponse, http_code: HTTPCode = HTTPCode.OK):
        raise Response(
            http_code,
            _file=file
        )

    @staticmethod
    def handle(func):
        def decorator(*args, **kwargs):
            try:
                returns = func(*args, **kwargs)
                if returns:
                    raise Response.server_error('API must return response via Response class')
            except Response as e:
                if e.secret_errors:
                    print(*e.secret_errors, sep='\n')
                return e.generate_response()
            except BaseException as e:
                res = Response(
                    Response.HTTPCode.INTERNAL_SERVER_ERROR,
                    Response.Reason.SERVER,
                    secret_errors=[str(e), traceback.format_exc()]
                )
                print(*res.secret_errors, sep='\n')
                return res.generate_response()

        return decorator

    def generate_response(self):
        if self._file:
            return self._file, self.http_code
        return {
            'success': self.reason == Response.Reason.NONE.value,
            'reason':  self.reason,
            'data':    self.kwargs if self.reason == Response.Reason.NONE.value else None,
            'popups':  self.popups,
            'desc':    self.desc,
            'errors':  self.secret_errors if self.reason != Reason.SERVER else None
        }, self.http_code
