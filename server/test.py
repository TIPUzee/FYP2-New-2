from utils import Func, SQL, SQLEntity, Validator as Vali


class Person(SQLEntity, Vali.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_id = Vali.PropertyValidatable(Vali.And(Vali.Str()))
        self.m_name = Vali.PropertyValidatable(Vali.Username())
        super().__init__()


class Patient(Person, SQLEntity, Vali.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_email = Vali.PropertyValidatable(Vali.And(Vali.Str()))
        self.m_password = Vali.PropertyValidatable(Vali.And(Vali.Str()))
        super().__init__()


u = Patient()
u.m_name = 'Ali'

Func.SqlHelpers.nb_of_coming_queries_to_print = 2


u.select(where_equals=[u.key.m_name])



# u.query('SELECT * FROM patient WHERE m_name in (%s)', [('ZEESHAN', 'USMAN')])
# print(u.m_name, u.m_email)
