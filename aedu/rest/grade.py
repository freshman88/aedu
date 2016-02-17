from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed
from aedu.rest.auth import is_login
from course.service import GradeService
import json

def all(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=GradeService()
    data={'code': 200}
    data['data'] = list(service.list())
    return HttpResponse(json.dumps(data))

def query(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    name=req.GET.get('name')
    value=req.GET.get('value')
    service=GradeService()
    data={'code': 200}
    data['data'] = list(service.query(name, value))
    return HttpResponse(json.dumps(data))


def findById(req, id):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=GradeService()
    data={'code': 200}
    data['data'] = dict(service.findById(id))
    return HttpResponse(json.dumps(data))


def delete(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=GradeService()
    service.delete(id)
    return HttpResponse(json.dumps({'code': 200}))


# sub functions



