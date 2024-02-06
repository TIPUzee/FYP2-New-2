from utils import Func, SQL, SQLEntity, Validator as Vali


class Person(SQLEntity, Vali.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_id = Vali.PropertyValidatable(Vali.And(Vali.Str()))
        self.m_name = Vali.PropertyValidatable(Vali.And(Vali.Str()))
        super().__init__()


class Patient(Person, SQLEntity, Vali.PropertyTypeValidatorEntity):
    def __init__(self):
        self.m_email = Vali.PropertyValidatable(Vali.And(Vali.Str()))
        self.m_password = Vali.PropertyValidatable(Vali.And(Vali.Str()))
        super().__init__()


u = Patient()
p = Patient()
u.m_name = '1'
u.m_password = '123'
u.m_email = '123'

Func.SqlHelpers.nb_of_coming_queries_to_print = 2
u.update(where_equals=[u.key.m_name])

sql = SQL()
a = sql.execute('SELECT * FROM patient WHERE m_name in (%s)', [['ZEESHAN', 'USMAN']])

print(a)

# u.query('SELECT * FROM patient WHERE m_name in (%s)', [('ZEESHAN', 'USMAN')])
# print(u.m_name, u.m_email)
