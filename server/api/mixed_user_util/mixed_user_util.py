from time import sleep
from utils import App, Func
from src import Patient, Doctor, Admin


@App.api_route('/email/<email_address>', 'GET', path_params_pre_conversion={'email_address': str}, access_control='All')
def _(user: None, email_address: str) -> None:
    p = Patient()
    p.turn_off_validation()
    p.m_email = email_address
    if p.exists():
        return App.Res.ok(exists=True)

    d = Doctor()
    d.turn_off_validation()
    d.m_email = email_address
    if d.exists():
        return App.Res.ok(exists=True)

    a = Admin()
    a.turn_off_validation()
    a.m_email = email_address
    if a.exists():
        return App.Res.ok(exists=True)

    return App.Res.ok(exists=False)
