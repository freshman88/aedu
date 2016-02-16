from django.http import HttpResponse, HttpResponseNotFound
from user.service import AdminService, TechService, StuService
import json

def login(request):
    if request.method != 'POST':
        return HttpResponseNotFound()

    uname = request.POST.get('uname')
    pw = request.POST.get('pw')
    utype = request.POST.get('utype')
    if utype == 'admin':
        return admin_login(request, uname, pw, utype)
    elif utype == 'tech':
        return tech_login(request, uname, pw, utype)
    elif utype == 'stu':
        return stu_login(request, uname, pw, utype)
    else:
        return HttpResponse(json.dumps({'code': 400, 'message': 'unknow login type'}))

def is_login(req):
    uname = req.session.get('uname')
    utype = req.session.get('utype')
    return uname is not None and utype is not None

def logout(req):
    if req.method != 'POST':
        return HttpResponseNotFound()

    if req.session.get('uname') is not None:
        del req.session['uname']
    if req.session.get('utype') is not None:
        del req.session['utype']
    if req.session.get('id') is not None:
        del req.session['id']
    return HttpResponse(json.dumps({'code': 200}))



# sub functions
error_msg1 = '该用户不存在'
error_msg2 = '用户名或密码错误'
def admin_login(req, uname, pw, utype):
    service = AdminService()
    rs = service.findByUsername(uname)
    if rs is None:
        return HttpResponse(json.dumps({'code': 400, 'message': error_msg1}))
    elif rs.password != pw:
        return HttpResponse(json.dumps({'code': 400, 'message': error_msg2}))
    else:
        req.session['uname'] = uname
        req.session['utype'] = utype
        req.session['id'] = rs.id
        return HttpResponse(json.dumps({'code': 200}))

def tech_login(req, uname, pw, utype):
    service = TechService()
    rs = service.findByNumber(uname)
    if rs is None:
        return HttpResponse(json.dumps({'code': 400, 'message': error_msg1}))
    elif rs.password != pw:
        return HttpResponse(json.dumps({'code': 400, 'message': error_msg2}))
    else:
        req.session['uname'] = uname
        req.session['utype'] = utype
        req.session['id'] = rs.id
        return HttpResponse(json.dumps({'code': 200}))

def stu_login(req, uname, pw, utype):
    service = StuService()
    rs = service.findByNumber(uname)
    if rs is None:
        return HttpResponse(json.dumps({'code': 400, 'message': error_msg1}))
    elif rs.password != pw:
        return HttpResponse(json.dumps({'code': 400, 'message': error_msg2}))
    else:
        req.session['uname'] = uname
        req.session['utype'] = utype
        req.session['id'] = rs.id
        return HttpResponse(json.dumps({'code': 200}))

