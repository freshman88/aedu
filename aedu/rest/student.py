from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed
from aedu.rest.auth import is_login
from user.service import StuService
import json

def all(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    techerId=None
    if 'tech' == req.session['utype']:
        techerId = req.session['id']
    service=StuService()
    data={'code': 200}
    
    data['data'] = list(service.list(techerId))
    return HttpResponse(json.dumps(data))

def query(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    techerId=None
    if 'tech' == req.session['utype']:
        techerId = req.session['id']
    name=req.GET.get('name')
    value=req.GET.get('value')
    service=StuService()
    data={'code': 200}
    data['data'] = list(service.query(name, value, techerId))
    return HttpResponse(json.dumps(data))


def save(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    service=StuService()
    service.save(
        name=req.POST.get('name'), 
        sex=req.POST.get('sex'), 
        age=req.POST.get('age'), 
        register=req.POST.get('register'), 
        baseUnit=req.POST.get('baseUnit'),
        techerId=req.POST.get('techerId'),
        techerNumber=req.POST.get('techerNumber'),
        techerName=req.POST.get('techerName')
    )
    return HttpResponse(json.dumps({'code': 200}))

def findById(req, id):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=StuService()
    data={'code': 200}
    data['data'] = dict(service.findById(id))
    return HttpResponse(json.dumps(data))

def update(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=StuService()
    service.update(
        id,
        name=req.POST.get('name'), 
        sex=req.POST.get('sex'), 
        age=req.POST.get('age'), 
        register=req.POST.get('register'), 
        baseUnit=req.POST.get('baseUnit'),
        techerId=req.POST.get('techerId'),
        techerNumber=req.POST.get('techerNumber'),
        techerName=req.POST.get('techerName')
    )
    return HttpResponse(json.dumps({'code': 200}))

def delete(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=StuService()
    service.delete(id)
    return HttpResponse(json.dumps({'code': 200}))

# sub functions



