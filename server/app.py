from utils import App

App.init_app('AI-Disease Predictor')
App.enable_cors()

from api import _

if __name__ == '__main__':
    App.run_app(debug=True)
