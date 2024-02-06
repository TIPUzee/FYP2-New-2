from enum import Enum


class Response(Exception):
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
        KEY_NOT_FOUND_IN_HEADERS = 'KEY_NOT_FOUND_IN_HEADERS'
        INVALID_VALUE = 'INVALID_VALUE'

    def __init__(
        self,
        http_code: HTTPCode = HTTPCode.OK,
        error_by: Error = Error.NONE,
        custom_error_code: CustomErrorCode = CustomErrorCode.NONE,
        error_messages: list[str] = None,
        **kwargs
    ):
        self.kwargs = kwargs
        self.http_code = http_code.value
        self.error_by: str = error_by.value
        self.error_messages: list[str] = error_messages
        self.custom_error_code: Response.CustomErrorCode = custom_error_code
        super().__init__()

    @staticmethod
    def server_error(*messages):
        raise Response(
            Response.HTTPCode.INTERNAL_SERVER_ERROR,
            Response.Error.SERVER,
            Response.CustomErrorCode.SERVER_ERROR,
            error_messages=[*messages]
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
            error_messages=[*messages]
        )

    @staticmethod
    def ok(**data):
        raise Response(Response.HTTPCode.OK, Response.Error.NONE, custom_error_code=Response.CustomErrorCode.NONE)

    @staticmethod
    def handle(func):
        def decorator(*args, **kwargs):
            try:
                returns = func(*args, **kwargs)
                if returns:
                    raise Response.server_error('API must return response via Response class')
            except Response as e:
                return e.generate_response()

        return decorator

    def generate_response(self):
        return {
            'success': self.error_by == Response.Error.NONE.value,
            'error':   {
                'reason':          self.error_by,
                'messages':        self.error_messages,
                'customErrorCode': self.custom_error_code.value
            },
            'data':    self.kwargs if self.error_by == Response.Error.NONE.value else None
        }, self.http_code
