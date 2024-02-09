import traceback
from enum import Enum

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


class Error(Enum):
    NONE = None
    SERVER = 'SERVER'
    CLIENT = 'CLIENT'
    FRONTEND = 'FRONTEND'


class CustomErrorCode(Enum):
    NONE = None
    SERVER_ERROR = 'SERVER_ERROR'
    FRONTEND_ERROR = 'FRONTEND_ERROR'
    KEY_NOT_FOUND_IN_HEADERS = 'KEY_NOT_FOUND_IN_HEADERS'
    INVALID_VALUE = 'INVALID_VALUE'
    INVALID_URL_PATH_PARAM = 'INVALID_URL_PATH_PARAM'
    INVALID_ACCESS_TOKEN = 'INVALID_ACCESS_TOKEN'
    INVALID_USER = 'INVALID_USER'
    FILE_DOES_NOT_EXIST = 'FILE_DOES_NOT_EXIST'
    API_NOT_FOUND = 'API_NOT_FOUND'


class Response(Exception):
    HTTPCode = HTTPCode
    Error = Error
    CustomErrorCode = CustomErrorCode

    def __init__(
        self,
        http_code: HTTPCode = HTTPCode.OK,
        error_by: Error = Error.NONE,
        custom_error_code: CustomErrorCode = CustomErrorCode.NONE,
        error_messages: list[str] = None,
        _file: FlaskResponse = None,
        **kwargs
    ):
        self.kwargs = kwargs
        self.http_code = http_code.value
        self.error_by: str = error_by.value
        self.error_messages: list[str] = error_messages
        self.custom_error_code: Response.CustomErrorCode = custom_error_code
        self._file = _file
        super().__init__()

    @staticmethod
    def server_error(*messages):
        raise Response(
            Response.HTTPCode.INTERNAL_SERVER_ERROR,
            Response.Error.SERVER,
            Response.CustomErrorCode.SERVER_ERROR,
            error_messages=[*messages, traceback.format_exc()]
        )

    @staticmethod
    def client_error(custom_error_code: CustomErrorCode, *messages: str):
        raise Response(
            Response.HTTPCode.BAD_REQUEST,
            Response.Error.CLIENT,
            custom_error_code,
            error_messages=[*messages]
        )

    @staticmethod
    def frontend_error(*messages):
        raise Response(
            Response.HTTPCode.BAD_REQUEST,
            Response.Error.FRONTEND,
            Response.CustomErrorCode.FRONTEND_ERROR,
            error_messages=[*messages]
        )

    @staticmethod
    def ok(**data):
        raise Response(
            Response.HTTPCode.OK,
            Response.Error.NONE,
            custom_error_code=Response.CustomErrorCode.NONE,
            **data
        )

    @staticmethod
    def unauthenticated(
        error_type: Error = Error.FRONTEND,
        custom_error_code: CustomErrorCode = CustomErrorCode.INVALID_USER,
        error_messages: list[str] = None
    ):
        raise Response(
            Response.HTTPCode.UNAUTHORIZED,
            error_type,
            custom_error_code,
            error_messages=error_messages
        )

    @staticmethod
    def send_file(file: FlaskResponse, http_code: HTTPCode = HTTPCode.OK):
        raise Response(
            http_code,
            _file=file
        )

    @staticmethod
    def file_not_found(*messages):
        raise Response(
            Response.HTTPCode.NOT_FOUND,
            Response.Error.CLIENT,
            Response.CustomErrorCode.FILE_DOES_NOT_EXIST,
            error_messages=[*messages]
        )

    @staticmethod
    def handle(func):
        def decorator(*args, **kwargs):
            try:
                returns = func(*args, **kwargs)
                if returns:
                    raise Response.server_error('API must return response via Response class')
            except Response as e:
                return e.generate_response()
            except BaseException as e:
                return Response(
                    Response.HTTPCode.INTERNAL_SERVER_ERROR,
                    Response.Error.SERVER,
                    Response.CustomErrorCode.SERVER_ERROR,
                    error_messages=[str(e), traceback.format_exc()]
                ).generate_response()

        return decorator

    def generate_response(self):
        if self._file:
            return self._file, self.http_code
        return {
            'success': self.error_by == Response.Error.NONE.value,
            'error':   {
                'reason':          self.error_by,
                'messages':        self.error_messages,
                'customErrorCode': self.custom_error_code.value
            },
            'data':    self.kwargs if self.error_by == Response.Error.NONE.value else None
        }, self.http_code
