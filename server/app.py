from __future__ import annotations

from src import Patient, Admin
from utils import App, UploadedFiles, SavedFile, Func

App.init_app('AI-Disease Predictor')


@App.api_route('/users', 'GET', access_control=[Patient.Login, Admin.Login])
@App.file_inputs('img')
def _(user: Patient | Admin, img: UploadedFiles):
    p = Patient()
    p.m_email = 'john@gmail.com'
    p.m_password = '123456'
    p.m_name = 'John Doe'
    p.m_dob = '1990-01-01'
    p.m_whatsapp_number = '1234567890'
    p.insert(load_inserted_id_to=p.key.m_id)
    return App.Res.ok(username='Hello World!')


@App.api_route('login', 'GET', access_control='All')
def _(user: None):
    p = Patient()
    p.m_id = 15
    token = p.Login.gen_token(p)
    return App.Res.ok(token=token)


@App.api_route('admin/login', 'GET', access_control='All')
def _(user: None):
    a = Admin()
    a.m_id = 18
    token = a.Login.gen_token(a)
    return App.Res.ok(token=token)


@App.api_route('f', 'GET', access_control='All')
def _(user: None):
    f = SavedFile('2024-02-09-00-16-24_e08767c9f0794d14a7613f475b6601d.png')
    if not f.exists():
        return App.Res.file_not_found('File does not exist', f'file={f.file_name}')
    return App.Res.send_file(f.return_file())


@App.api_route('load', 'GET', access_control='All')
def _(user: None):
    user = Patient()
    user.m_name = 'John Doe'
    _usr = user.Login()
    _usr.m_email = 'zshann992@gmail.com'
    _usr.send_mail()
    Func.SqlHelpers.nb_of_coming_queries_to_print = 1
    print(user.exists())
    return App.Res.ok()


@App.template_route('/', methods=['GET'])
def _():
    return 'Hello World 2!'


if __name__ == '__main__':
    App.run_app(debug=True)
