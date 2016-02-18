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
        return Tech.objects.values('id', 'number', 'name', 'sex', 'age', 'techAge', 'baseUnit').order_by('-number')

    def save(self, **kw):
        number = self._createNewNumber()
        password = createDefaultPW()
        u = Tech(number=number, password=password,
            name=kw['name'], sex=kw['sex'], age=kw['age'], techAge=kw['techAge'], baseUnit=kw['baseUnit'])
        u.save()

    def _createNewNumber(self):
        rs = Tech.objects.values('number').order_by('-number')[0:1]
        if len(rs) == 0:
            oldNumber = 'L001'
        else:
            oldNumber = rs[0].get('number')
        return createNumber(oldNumber)

    def update(self, id, **kw):
        Tech.objects.filter(id=id).update(name=kw['name'], sex=kw['sex'], age=kw['age'], techAge=kw['techAge'], baseUnit=kw['baseUnit'])

    def delete(self, id):
        u = Tech.objects.get(id=id)
        u.delete()

    def list(self):
        return self._myRS().all()

    def findById(self, id):
        return self._myRS().get(id=id)

    def findByNumber(self, number):
        rlist = Tech.objects.filter(number=number)
        if len(rlist) < 1:
            return None
        else:
            return rlist[0]

    def query(self, name, value):
        if name == 'number':
            return self._myRS().filter(number__exact=value)
        elif name == 'name':
            return self._myRS().filter(name__exact=value)
        else:
            return []



class StuService:

    def _myRS(self):
        return Stu.objects.values('id', 'number', 'name', 'sex',
             'age', 'register', 'baseUnit', 
             'techerId', 'techerNumber', 'techerName').order_by('-number')

    def save(self, **kw):
        number = self._createNewNumber()
        password = createDefaultPW()
        u = Stu(number=number, password=password,
            name=kw['name'], sex=kw['sex'], age=kw['age'], register=kw['register'], baseUnit=kw['baseUnit'],
            techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'])
        u.save()

    def _createNewNumber(self):
        rs = Stu.objects.values('number').order_by('-number')[0:1]
        if len(rs) == 0:
            oldNumber = 'N001'
        else:
            oldNumber = rs[0].get('number')
        return createNumber(oldNumber)

    def update(self, id, **kw):
        Stu.objects.filter(id=id).update(
            name=kw['name'], sex=kw['sex'], age=kw['age'], register=kw['register'], baseUnit=kw['baseUnit'],
            techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'])

    def delete(self, id):
        u = Stu.objects.get(id=id)
        u.delete()

    def list(self, techerId):
        if techerId is None:
            return self._myRS().all()
        else:
            return self._myRS().filter(techerId=techerId)

    def findById(self, id):
        return self._myRS().get(id=id)

    def findByNumber(self, number):
        rlist = Stu.objects.filter(number=number)
        if len(rlist) < 1:
            return None
        else:
            return rlist[0]

    def query(self, name, value, techerId):
        if techerId is None: 
            if name == 'number':
                return self._myRS().filter(number__exact=value)
            elif name == 'name':
                return self._myRS().filter(name__exact=value)
            else:
                return []
        else:
            if name == 'number':
                return self._myRS().filter(number__exact=value, techerId=techerId)
            elif name == 'name':
                return self._myRS().filter(name__exact=value, techerId=techerId)
            else:
                return []



# sub functions
def createNumber(oldNumber):
    num = int(oldNumber[1:])+1
    numStr = str(num)
    while len(numStr)<3:
        numStr = "0"+numStr
    return oldNumber[0]+numStr

def createDefaultPW():
    return "1234567"
