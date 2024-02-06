from flask import Flask

from .response import Response as Res
from ..funcs import Func


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
    def template_route(route_url: str, **kwargs):
        def decorator(func):
            Func.assign_uui(func)
            App._App.add_url_rule(route_url, func.__name__, func, **kwargs)
            return func

        Func.assign_uui(decorator)
        return decorator

    @staticmethod
    def api_route(route_url: str, method: str, **kwargs):
        def decorator(func):
            _func = Res.handle(func)
            Func.assign_uui(_func)
            App._App.route(f'/api/{route_url}', methods=[method], **kwargs)(_func)

        Func.assign_uui(decorator)
        return decorator
