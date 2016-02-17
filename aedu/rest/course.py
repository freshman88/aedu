from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed
from aedu.rest.auth import is_login
from course.service import CourseService
import json

def all(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=CourseService()
    data={'code': 200}
    data['data'] = list(service.list(req.GET.get('techerId')))
    return HttpResponse(json.dumps(data))

def query(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    name=req.GET.get('name')
    value=req.GET.get('value')
    service=CourseService()
    data={'code': 200}
    data['data'] = list(service.query(name, value, req.GET.get('techerId')))
    return HttpResponse(json.dumps(data))


def save(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    service=CourseService()
    service.save(
        name=req.POST.get('name'), 
        purpose=req.POST.get('purpose'), 
        techerId=req.POST.get('techerId'),
        techerNumber=req.POST.get('techerNumber'),
        techerName=req.POST.get('techerName')
    )
    return HttpResponse(json.dumps({'code': 200}))

def findById(req, id):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=CourseService()
    data={'code': 200}
    data['data'] = dict(service.findById(id))
    return HttpResponse(json.dumps(data))


def delete(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=CourseService()
    service.delete(id)
    return HttpResponse(json.dumps({'code': 200}))

# sub functions



