from dotenv import load_dotenv
from dotenv import dotenv_values
config = dotenv_values(".env")

load_dotenv()


class Env:
    @staticmethod
    def get(key: str):
        return config[key]

    @staticmethod
    def all():
        return config
