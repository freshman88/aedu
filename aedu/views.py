from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotAllowed
from django.shortcuts import render_to_response
from aedu.rest.auth import is_login


def index(request):
    if is_login(request):
        return HttpResponseRedirect('/manage')
    return render_to_response('index.html')

def manage(request):
    if not is_login(request):
        return HttpResponseNotAllowed()
    utype = request.session['utype']
    if utype == 'admin':
        return render_to_response('manage.html')
    elif utype == 'tech':
        return render_to_response('manage2.html')
    elif utype == 'stu':
        return render_to_response('manage3.html')
    else:
        return HttpResponseNotAllowed()

