from time import sleep
from utils import App
from src import Patient, Doctor


@App.api_route('/auth', 'POST', access_control='All')
@App.json_inputs('user_type', 'name', 'dob', 'whatsapp_number', 'email', 'password')
def _(user: None, user_type: str, name, dob, whatsapp_number, email, password):
    if user_type not in ('p', 'd'):
        App.Res.frontend_error('Invalid user type.')
    if user_type == 'p':
        u = Patient()
    else:
        u = Doctor()
    sleep(3)
    u.m_name = name
    u.m_dob = dob
    u.m_whatsapp_number = whatsapp_number
    u.m_email = email
    u.m_password = password
    if not u.insert(load_inserted_id_to=u.key.m_id):
        return App.Res.server_error('Unfortunately, registration failed. Please try again.')
    return App.Res.ok(['Registration successful.'], token=u.Register.gen_token(u), user_type=user_type)
