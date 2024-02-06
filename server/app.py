from utils import App, Validator as Vali

App.init_app('AI-Disease Predictor')


class B(Vali.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_email = Vali.set_validator(Vali.And(Vali.Str(), Vali.Email()))
        self._validator_errors_type = 'FRONTEND'
        super().__init__()
        self.setup_property_setters(self)


class A(B, Vali.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_name = Vali.set_validator(
            Vali.And(
                Vali.Str(), Vali.MinLen(5), Vali.MaxLen(10),
                self._m_name_validator()
            )
        )
        super().__init__()
        self.setup_property_setters(self)

    @staticmethod
    def _m_name_validator():
        def _(value):
            if value not in ['ZEESHAN', 'USMAN']:
                return False
            else:
                return True

        _.__custom_str_format__ = "In('ZEESHAN', 'USMAN')"
        return _


@App.api_route('', 'GET')
@App.json_inputs()
def _():
    a = A()
    # a._validator_errors_type = App.Res.Error.CLIENT.value
    a.m_email = 'hii@gmail.com'
    print(a.m_email)
    return App.Res.ok(username='Hello World!')


@App.api_route('', 'GET')
def _():
    a = A()
    a._validator_errors_type = App.Res.Error.CLIENT.value
    a.m_name = 'ZEESHAN'
    a.m_email = 'hii'
    return App.Res.ok(username='Hello World!')


@App.api_route('a', 'GET')
def _():
    a = A()
    a._validator_errors_type = App.Res.Error.FRONTEND.value
    a.m_name = '65'
    return App.Res.ok(username='Hello World!')


@App.template_route('/', methods=['GET'])
def _():
    return 'Hello World 2!'


if __name__ == '__main__':
    App.run_app(debug=True)
