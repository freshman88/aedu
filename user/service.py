from user.models import Admin, Tech, Stu

class AdminService:

    def save(self, username, password):
        u = Admin(username=username, password=password)
        u.save()

    def list(self):
        return Admin.objects.all()

    def findByUsername(self, username):
        rlist = Admin.objects.filter(username=username)
        if len(rlist) < 1:
            return None
        else:
            return rlist[0]


class TechService:

    def _myRS(self):
        return Tech.objects.values('number', 'name', 'sex', 'age', 'techAge', 'baseUnit').order_by('-number')

    def save(self, **kw):
        number = self._createNewNumber()
        password = createDefaultPW()
        u = Tech(number=number, password=password,
            name=kw.name, sex=kw.sex, age=kw.age, techAge=kw.techAge, baseUnit=kw.baseUnit)
        u.save()

    def _createNewNumber(self):
        oldNumber = Tech.objects.order_by('-number')[0]
        if oldNumber is None:
            oldNumber = 'L001'
        return createNumber(oldNumber)

    def list(self):
        return self._myRS().all()

    def findByNumber(self, number):
        rlist = self._myRS().filter(number=number)
        if len(rlist) < 1:
            return None
        else:
            return rlist[0]

    def queryByNumber(self, number):
        return self._myRS().filter(number__exact=number)

    def queryByName(self, name):
        return self._myRS().filter(name__exact=name)


class StuService:

    def _myRS(self):
        return Stu.objects.values('number', 'name', 'sex', 'age', 'register', 'baseUnit').order_by('-number')

    def save(self, **kw):
        number = self._createNewNumber()
        password = createDefaultPW()
        u = Stu(number=number, password=password,
            name=kw.name, sex=kw.sex, age=kw.age, register=kw.register, baseUnit=kw.baseUnit)
        u.save()

    def _createNewNumber(self):
        oldNumber = Tech.objects.order_by('-number')[0]
        if oldNumber is None:
            oldNumber = 'S001'
        return createNumber(oldNumber)

    def list(self):
        return self._myRS().all()

    def findByNumber(self, number):
        rlist = self._myRS().filter(number=number)
        if len(rlist) < 1:
            return None
        else:
            return rlist[0]

    def queryByNumber(self, number, techerId):
        if number is None:
            return self._myRS().all()
        # if techerId is None:
        #     return self._myRS().filter(number__exact=number)
        # else:
        #     None
        return self._myRS().filter(number__exact=number)

    def queryByName(self, name, techerId):
        # if techerId is None:
        #     return self._myRS().filter(name__exact=name)
        # else:
        #     None
        return self._myRS().filter(name__exact=name)


# sub functions
def createNumber(oldNumber):
    num = int(oldNumber[1:])+1
    numStr = str(num)
    while len(numStr)<3:
        numStr = "0"+numStr
    return oldNumber[0]+numStr

def createDefaultPW():
    return "1234567"
