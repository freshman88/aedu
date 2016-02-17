from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed
from aedu.rest.auth import is_login
from course.service import CourseService, QuestionService, GradeService
import json
import random

def all(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=QuestionService()
    data={'code': 200}
    data['data'] = list(service.list())
    return HttpResponse(json.dumps(data))

def query(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    name=req.GET.get('name')
    value=req.GET.get('value')
    service=QuestionService()
    data={'code': 200}
    data['data'] = list(service.query(name, value))
    return HttpResponse(json.dumps(data))


def save(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    service=QuestionService()
    service.save(
        name=req.POST.get('name'), 
        content=req.POST.get('content'), 
        answerA=req.POST.get('answerA'),
        answerB=req.POST.get('answerB'),
        answerC=req.POST.get('answerC'),
        answerD=req.POST.get('answerD'),
        rightAnswer=req.POST.get('rightAnswer'),
        point=req.POST.get('point'),
        courseId=req.POST.get('courseId'),
        courseName=req.POST.get('courseName')
    )
    return HttpResponse(json.dumps({'code': 200}))

def findById(req, id):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=QuestionService()
    data={'code': 200}
    data['data'] = dict(service.findById(id))
    return HttpResponse(json.dumps(data))


def delete(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=QuestionService()
    service.delete(id)
    return HttpResponse(json.dumps({'code': 200}))

def exam(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    max_len = 5
    service=QuestionService()
    courseId = req.GET.get('courseId')
    all_list = list(service.findByCourseId(courseId))
    if len(all_list) <= max_len:
        examData = all_list
    else:
        examData = list()
        i=0
        indeMap = dict()
        while i<max_len:
            randomIndex = int(random.random()*len(all_list))
            if indeMap.get(randomIndex) is None:
                examData.append(all_list[randomIndex])
                indeMap[randomIndex] = True
                i=i+1
    data={'code': 200}
    data['data'] = examData
    return HttpResponse(json.dumps(data))

def grade(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    answer_list = req.POST.get('answers').split(',')
    service=QuestionService()
    totalPoint = 0
    i = 0
    for idStr in req.POST.get('ids').split(','):
        q = service.findById(int(idStr))
        if q.rightAnswer == answer_list[i]:
            totalPoint += q.point
        i = i+1
    
    c_service=CourseService()
    courseId = req.POST.get('courseId')
    course=c_service.findById(courseId)
    g_service=GradeService()
    g_service.save(
        point=totalPoint, 
        courseId=courseId, 
        courseName=course.name, 
        techerId=course.techerId, 
        techerNumber=course.techerNumber, 
        techerName=course.techerNumber
    )
    return HttpResponse(json.dumps({'code': 200}))


# sub functions



