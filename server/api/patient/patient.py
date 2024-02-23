from utils import App


@App.api_route('/patient', 'POST', access_control='All')
def _(user: None):
    return App.Res.ok('Patient data received.')
