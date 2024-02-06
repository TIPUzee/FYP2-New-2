class None2:
    def __init__(self):
        pass

    def __eq__(self, other):
        print('None2 __eq__')
        if other is None:
            return True
        else:
            return False

    def __ne__(self, other):
        print('None2 __ne__')
        if other is None:
            return False
        else:
            return True

    def __bool__(self):
        print('None2 __bool__')
        return False


_ = None
_.__hash__ = 'Hello'

print(dir(_))

if not None2():
    print('None2 is None')
else:
    print('None2 is not None')

_None = None


class A(_None):
    pass
