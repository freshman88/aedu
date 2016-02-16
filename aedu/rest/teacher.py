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
    uname = req.session.get('uname')
    utype = req.session.get('utype')
    return uname is not None and utype is not None


def save(req):
    if not is_login(req):
        return HttpResponseNotAllowed()
    None

# sub functions



