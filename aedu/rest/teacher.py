from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed
from aedu.rest.auth import is_login
from user.service import TechService
import json

def all(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=TechService()
    data={'code': 200}
    data['data'] = list(service.list())
    return HttpResponse(json.dumps(data))

def query(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    name=req.GET.get('name')
    value=req.GET.get('value')
    service=TechService()
    data={'code': 200}
    data['data'] = list(service.query(name, value))
    return HttpResponse(json.dumps(data))


def save(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    service=TechService()
    service.save(
        name=req.POST.get('name'), 
        sex=req.POST.get('sex'), 
        age=req.POST.get('age'), 
        techAge=req.POST.get('techAge'), 
        baseUnit=req.POST.get('baseUnit')
    )
    return HttpResponse(json.dumps({'code': 200}))

def findById(req, id):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=TechService()
    data={'code': 200}
    data['data'] = dict(service.findById(id))
    return HttpResponse(json.dumps(data))

def update(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=TechService()
    service.update(
        id,
        name=req.POST.get('name'), 
        sex=req.POST.get('sex'), 
        age=req.POST.get('age'), 
        techAge=req.POST.get('techAge'), 
        baseUnit=req.POST.get('baseUnit')
    )
    return HttpResponse(json.dumps({'code': 200}))

def delete(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=TechService()
    service.delete(id)
    return HttpResponse(json.dumps({'code': 200}))

# sub functions



