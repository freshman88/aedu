from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed
from aedu.rest.auth import is_login
from course.service import ResourceService
import json

def all(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    service=ResourceService()
    data={'code': 200}
    data['data'] = list(service.list())
    return HttpResponse(json.dumps(data))


def save(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    service=ResourceService()
    service.save(
        content=req.POST.get('content'), 
        url=req.POST.get('url'), 
        courseId=req.POST.get('courseId'),
        courseName=req.POST.get('courseName')
    )
    return HttpResponse(json.dumps({'code': 200}))


def delete(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if not is_login(req):
        return HttpResponseNotAllowed()
    id = req.POST.get('id')
    service=ResourceService()
    service.delete(id)
    return HttpResponse(json.dumps({'code': 200}))

# sub functions



