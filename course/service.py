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
            return Course.objects.all()
        else:
            return Course.objects.filter(techerId=techerId)

    def findById(self, id):
        return Course.objects.get(id=id)

    def query(self, name, value, techerId):
        if techerId is None:
            if name == 'id':
                return Course.objects.filter(id=value)
            elif name == 'name':
                return Course.objects.filter(name__exact=value)
            else:
                return []
        else:
            if name == 'id':
                return Course.objects.filter(id=value)
            elif name == 'name':
                return Course.objects.filter(name__exact=value, techerId=techerId)
            else:
                return []


class QuestionService:

    def save(self, **kw):
        u = Question(name=kw['name'], content=kw['content'], 
            answerA=kw['answerA'], answerB=kw['answerB'], answerC=kw['answerC'], answerD=kw['answerD'],
            point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'])
        u.save()

    def update(self, id, **kw):
        Question.objects.filter(id=id).update(name=kw['name'], content=kw['content'], 
            answerA=kw['answerA'], answerB=kw['answerB'], answerC=kw['answerC'], answerD=kw['answerD'],
            point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'])

    def delete(self, id):
        u = Question.objects.get(id=id)
        u.delete()

    def list(self):
        return Question.objects.all()

    def findById(self, id):
        return Question.objects.get(id=id)

    def findByCourseId(self, courseId):
        return Question.objects.filter(courseId=courseId)

    def query(self, name, value):
        if name == 'name':
            return Question.objects.filter(name__exact=value)
        elif name == 'courseName':
            return Question.objects.filter(courseName=value)
        else:
            return []


class GradeService:

    def save(self, **kw):
        u = Grade(point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'], 
            techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'],
            time=self._nowTime())
        u.save()

    def _nowTime(self):
        return time.strftime('%Y-%m-%d %H:%M:%S')

    def update(self, id, **kw):
        Grade.objects.filter(id=id).update(point=kw['point'], courseId=kw['courseId'], courseName=kw['courseName'], 
            techerId=kw['techerId'], techerNumber=kw['techerNumber'], techerName=kw['techerName'],
            time=self._nowTime())

    def delete(self, id):
        u = Grade.objects.get(id=id)
        u.delete()

    def list(self):
        return Grade.objects.all()

    def findById(self, id):
        return Grade.objects.get(id=id)

    def query(self, name, value):
        if name == 'courseId':
            return Question.objects.filter(courseId=value)
        elif name == 'id':
            return Question.objects.filter(id=value)
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
        return Resource.objects.all()

    def findById(self, id):
        return Resource.objects.get(id=id)







