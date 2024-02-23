from __future__ import annotations

from typing import Any, Callable, Literal

from flask import Flask, request

from .response import Response as Res
from ..access_controlled_entity import AccessControlledEntity
from ..funcs import Func
from ..uploaded_file import UploadedFiles


class App:
    _App: Flask = None
    Res = Res

    @staticmethod
    def init_app(app_name: str):
        App._App = Flask(app_name)

    @staticmethod
    def get_app() -> Flask:
        return App._App

    @staticmethod
    def run_app(**kwargs):
        App._App.run(**kwargs)

    @staticmethod
    def enable_cors():
        from flask_cors import CORS
        CORS(App._App)

    @staticmethod
    def template_route(route_url: str, **kwargs):
        def decorator(func):
            Func.assign_uui(func)
            App._App.add_url_rule(route_url, func.__name__, func, **kwargs)
            return func

        Func.assign_uui(decorator)
        return decorator

    @staticmethod
    def api_route(
        route_url: str,
        method: str,
        path_params_pre_conversion: dict[str, Callable[[Any], Any]] = None,
        path_params_validators: dict[str, Callable[[Any], bool]] = None,
        access_control: list[type[AccessControlledEntity]] | Literal['All'] = None,
        **kwargs
    ):
        def decorator(func):
            def _(*args, **_kwargs):
                user = App.__validate_access_control(access_control)
                _kwargs = App.perform_pre_conversions(path_params_pre_conversion, **_kwargs)
                App.__validate_path_params(path_params_validators, **_kwargs)
                return func(user=user, *args, **_kwargs)

            _func = Res.handle(_)
            Func.assign_uui(_func)
            App.__validate_api_route(route_url)
            App._App.route(f'/api{route_url}', methods=[method], **kwargs)(_func)

        Func.assign_uui(decorator)
        return decorator

    @staticmethod
    def __validate_api_route(route: str):
        if not route.startswith('/'):
            raise ValueError('API route must start with /', 'Provided route:', route)

    @staticmethod
    def __validate_access_control(access_control: list[type[AccessControlledEntity]] | Literal['All'] | None):
        if access_control == 'All':
            return None
        if not access_control:
            return Res.unauthenticated('No access control to any entity', reason=Res.Reason.FRONTEND)
        token_sending_options = []
        for entity in access_control:
            if not issubclass(entity, AccessControlledEntity):
                return Res.server_error('Invalid access control entity')
            token = entity.fetch_token()
            if not token:
                token_sending_options.append(entity.get_representation_str())
                continue
            token = entity.parse_token(token)
            if not token:
                token_sending_options.append(entity.get_representation_str())
                continue
            user = entity.get_user(token)
            if not user:
                token_sending_options.append(entity.get_representation_str())
                continue
            break
        else:
            return Res.unauthenticated(
                *[f'Failed to get or parse access control token as {token}' for token in token_sending_options],
                reason=Res.Reason.FRONTEND
            )
        return user

    @staticmethod
    def __validate_path_params(path_params: dict[str, Callable[[Any], bool]], **kwargs):
        if not path_params:
            return
        for param, validator in path_params.items():
            if not validator(kwargs[param]):
                return Res.frontend_error(f'Invalid path param: {param}')

    @staticmethod
    def perform_pre_conversions(pre_conversions: dict[str, Callable[[Any], Any]], **kwargs):
        if not pre_conversions:
            return kwargs
        for param, conversion in pre_conversions.items():
            try:
                kwargs[param] = conversion(kwargs[param])
            except:
                return Res.frontend_error(f'Invalid param: {param}')
        return kwargs

    @staticmethod
    def json_inputs(*req_params: str):
        def decorator(func):
            def _(*args, **kwargs):
                inputs = App.__get_json_inputs(*req_params)
                return func(*args, **kwargs, **inputs)
            Func.assign_uui(_)
            return _

        Func.assign_uui(decorator)
        return decorator

    @staticmethod
    def __get_json_inputs(*req_params: str) -> dict[str, Any]:
        try:
            json = request.json
        except:
            return Res.frontend_error('Invalid JSON body')

        inputs = {}
        for param in req_params:
            if param not in json:
                return Res.frontend_error(f'Missing required param in JSON body: {param}')
            inputs[param] = json[param]
        return inputs

    @staticmethod
    def form_inputs(*req_params: str):
        def decorator(func):
            def _(*args, **kwargs):
                inputs = App.__get_form_inputs(*req_params)
                return func(*args, **kwargs, **inputs)
            Func.assign_uui(_)
            return _

        Func.assign_uui(decorator)
        return decorator

    @staticmethod
    def __get_form_inputs(*req_params: str) -> dict[str, Any]:
        try:
            form = request.form
        except:
            return Res.frontend_error('Invalid form body')

        inputs = {}
        for param in req_params:
            if param not in form:
                return Res.frontend_error(f'Missing required param in form body: {param}')
            inputs[param] = form[param]
        return inputs

    @staticmethod
    def file_inputs(*req_params: str):
        def decorator(func):
            def _(*args, **kwargs):
                inputs = App.__get_file_inputs(*req_params)
                return func(*args, **kwargs, **inputs)
            Func.assign_uui(_)
            return _

        Func.assign_uui(decorator)
        return decorator

    @staticmethod
    def __get_file_inputs(*req_params: str) -> dict[str, Any]:
        try:
            files = request.files
        except:
            return Res.frontend_error('Invalid form files body')
        files = {k: v for k, v in files.lists()}

        inputs = {}
        for param in req_params:
            if param not in files:
                return Res.frontend_error(f'Missing required param in form files body: {param}')
            inputs[param] = UploadedFiles([f for f in files[param] if f.filename])
        return inputs

    @staticmethod
    def url_inputs(*req_params: str):
        def decorator(func):
            def _(*args, **kwargs):
                inputs = App.__get_url_inputs(*req_params)
                return func(*args, **kwargs, **inputs)
            Func.assign_uui(_)
            return _

        Func.assign_uui(decorator)
        return decorator

    @staticmethod
    def __get_url_inputs(*req_params: str) -> dict[str, Any]:
        try:
            url = request.args
        except:
            return Res.frontend_error('Invalid URL params')

        inputs = {}
        for param in req_params:
            if param not in url:
                return Res.frontend_error(f'Missing required param in URL: {param}')
            inputs[param] = url[param]
        return inputs
