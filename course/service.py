from course.models import Course, Question, Grade, Resource
import time

class CourseService:

    def save(self, **kw):
        u = Course(name=kw['name'], purpose=kw['purpose'], techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'])
        u.save()

    def update(self, id, **kw):
        Course.objects.filter(id=id).update(name=kw['name'], purpose=kw['purpose'], techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'])

    def delete(self, id):
        u = Course.objects.get(id=id)
        u.delete()

    def list(self, techerId):
        if techerId is None:
            return Course.objects.all().values()
        else:
            return Course.objects.filter(techerId=techerId).values()

    def findById(self, id):
        return Course.objects.get(id=id)

    def query(self, name, value, techerId):
        if techerId is None:
            if name == 'id':
                return Course.objects.filter(id=value).values()
            elif name == 'name':
                return Course.objects.filter(name__exact=value).values()
            else:
                return []
        else:
            if name == 'id':
                return Course.objects.filter(id=value).values()
            elif name == 'name':
                return Course.objects.filter(name__exact=value, techerId=techerId).values()
            else:
                return []


class QuestionService:

    def save(self, **kw):
        u = Question(name='', content=kw['content'], 
            answerA=kw['answerA'], answerB=kw['answerB'], answerC=kw['answerC'], answerD=kw['answerD'],
            rightAnswer=kw['rightAnswer'], point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'])
        u.save()

    def update(self, id, **kw):
        Question.objects.filter(id=id).update(name='', content=kw['content'], 
            answerA=kw['answerA'], answerB=kw['answerB'], answerC=kw['answerC'], answerD=kw['answerD'],
            rightAnswer=kw['rightAnswer'], point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'])

    def delete(self, id):
        u = Question.objects.get(id=id)
        u.delete()

    def list(self):
        return Question.objects.all().values()

    def findById(self, id):
        return Question.objects.get(id=id)

    def findByCourseId(self, courseId):
        return Question.objects.filter(courseId=courseId).values()

    def query(self, name, value):
        if name == 'name':
            return Question.objects.filter(name__exact=value).values()
        elif name == 'courseName':
            return Question.objects.filter(courseName=value).values()
        else:
            return []


class GradeService:

    def save(self, **kw):
        u = Grade(totalPoint=kw['totalPoint'], point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'], 
            techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'],
            stuId=kw['stuId'], stuNumber=kw['stuNumber'], stuName=kw['stuName'],
            time=self._nowTime())
        u.save()

    def _nowTime(self):
        return time.strftime('%Y-%m-%d %H:%M:%S')

    def update(self, id, **kw):
        Grade.objects.filter(id=id).update(totalPoint=kw['totalPoint'], point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'], 
            techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'],
            stuId=kw['stuId'], stuNumber=kw['stuNumber'], stuName=kw['stuName'],
            time=self._nowTime())

    def delete(self, id):
        u = Grade.objects.get(id=id)
        u.delete()

    def list(self):
        return Grade.objects.all().values()

    def findById(self, id):
        return Grade.objects.get(id=id)

    def findByTechId(self, techerId):
        return Grade.objects.filter(techerId=techerId).values()

    def findByStuId(self, stutId):
        return Grade.objects.filter(stuId=stutId).values()

    def query(self, name, value):
        if name == 'courseId':
            return Question.objects.filter(courseId=value).values()
        elif name == 'id':
            return Question.objects.filter(id=value).values()
        else:
            return []

    def queryByTechId(self, name, value, techerId):
        if name == 'courseId':
            return Question.objects.filter(courseId=value, techerId=techerId).values()
        elif name == 'id':
            return Question.objects.filter(id=value, techerId=techerId).values()
        else:
            return []

    def queryByStuId(self, name, value, stutId):
        if name == 'courseId':
            return Question.objects.filter(courseId=value, stuId=stutId).values()
        elif name == 'id':
            return Question.objects.filter(id=value, stuId=stutId).values()
        else:
            return []



class ResourceService:

    def save(self, **kw):
        u = Resource(content=kw['content'], url=kw['url'], courseId=kw['courseId'], 
            courseName=kw['courseName'])
        u.save()

    def update(self, id, **kw):
        Resource.objects.filter(id=id).update(content=kw['content'], url=kw['url'], courseId=kw['courseId'], 
            courseName=kw['courseName'])

    def delete(self, id):
        u = Resource.objects.get(id=id)
        u.delete()

    def list(self):
        return Resource.objects.all().values()

    def findById(self, id):
        return Resource.objects.get(id=id)







