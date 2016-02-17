from django.conf.urls import patterns, include, url
# from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from aedu.views import index, manage
from aedu.rest import auth, teacher, student, course, question, grade, resource

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'aedu.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),

    ('^$', index),
    ('^manage/$', manage),

    ('^rest/auth/login$', auth.login),
    ('^rest/auth/logout$', auth.logout),

    ('^rest/techer/list$', teacher.all),
    ('^rest/techer/query$', teacher.query),
    ('^rest/techer/add$', teacher.save),
    ('^rest/techer/(\d)$', teacher.findById),
    ('^rest/techer/update$', teacher.update),
    ('^rest/techer/delete$', teacher.delete),

    ('^rest/student/list$', student.all),
    ('^rest/student/query$', student.query),
    ('^rest/student/add$', student.save),
    ('^rest/student/(\d)$', student.findById),
    ('^rest/student/update$', student.update),
    ('^rest/student/delete$', student.delete),

    ('^rest/course/list$', course.all),
    ('^rest/course/query$', course.query),
    ('^rest/course/add$', course.save),
    ('^rest/course/delete$', course.delete),

    ('^rest/question/list$', question.all),
    ('^rest/question/query$', question.query),
    ('^rest/question/add$', question.save),
    ('^rest/question/delete$', question.delete),
    ('^rest/question/exam$', question.exam),
    ('^rest/question/grade$', question.grade),

    ('^rest/grade/list$', grade.all),
    ('^rest/grade/query$', grade.query),

    ('^rest/resource/list$', resource.all),
    ('^rest/resource/add$', resource.save),
    ('^rest/resource/delete$', resource.delete),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


