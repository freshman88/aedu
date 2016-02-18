$(function(){

    $('#leftNav li').on('click', function(){
        $('#leftNav li').removeClass('active');
        $(this).addClass('active');

        $('.main').hide();
        $('#'+$(this).attr('content-id')).show();
    });
    $('#student_add_btn').on('click', function(){
        $('.main').hide();
        $('#student_add').show();
    });
    $('#course_add_btn').on('click', function(){
        $('.main').hide();
        $('#course_add').show();
    });
    $('#testPaper_add_btn').on('click', function(){
        $('.main').hide();
        $('#testPaper_add').show();
    });
    $('#resource_add_btn').on('click', function(){
        $('.main').hide();
        $('#resource_add').show();
    });


    $('#logout').on('click', function(){
        $.ajax({
            url: '/rest/auth/logout',
            type: 'post',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                location.href = '/';
            }
        });
    });




    function fillStudentList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].number).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].name).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].sex).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].age).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].register).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].baseUnit).html()+"</td>",

                    "<td><a data-id='"+list[i].id+"' class='mylink mystu-edit' href='javascript:void(0);'>修改</a>",
                    "<a data-id='"+list[i].id+"' class='mylink mystu-del' href='javascript:void(0);'>删除</a></td>",
                    
                    "</tr>"
                ].join('');
            html += s;
        }
        $('#studentList').html(html);
        $('#studentList .mystu-edit').on('click', function(){
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/rest/student/'+id,
                type: 'get',
                dataType: 'json',
                success: function(rs){
                    if (rs.code != 200) {
                        layer.alert(rs.message);
                        return;
                    }
                    var data = rs.data;
                    $('#student_edit_name').val(data.name);
                    $('#student_edit_sex').val(data.sex);
                    $('#student_edit_age').val(data.age);
                    $('#student_edit_home').val(data.register);
                    $('#student_edit_department').val(data.baseUnit);
                    $('#student').hide();
                    $('#student_edit').attr('data-id', id).show();
                    findAllTeacher(function(){
                        $('#student_edit_techer').val([data.techerId, data.techerNumber, data.techerName].join('|'));
                    });
                }
            });
        });
        $('#studentList .mystu-del').on('click', function(){
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/rest/student/delete',
                type: 'post',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function(rs){
                    if (rs.code != 200) {
                        layer.alert(rs.message);
                        return;
                    }
                    $('#studentNav').trigger('click');
                }
            });
        });
    }
    $('#studentNav').on('click', function(){
        $('#student_search_input').val('');
        $.ajax({
            url: '/rest/student/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#studentListNoData').hide();
                    fillStudentList(rs.data);
                }
            }
        });
    });

    function findAllTeacher(callback){
        function fill(list){
            var html = "";
            for (var i=0; i<list.length; i++) {
                html += [
                    '<option value="'+[list[i].id, list[i].number, list[i].name].join('|')+'">',
                    list[i].name+'   '+list[i].number,
                    '</option>'
                ].join('');
            }
            $('#student_add_techer, #student_edit_techer').html(html);
        }
        $.ajax({
            url: '/rest/techer/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                fill(rs.data);
                callback && callback();
            }
        });
    }
    $('#student_add_btn').on('click', function(){
        findAllTeacher();
    });
    $('#student_search_btn').on('click', function(){
        if (!$('#student_search_input').val()) {
            $('#studentNav').trigger('click');
            return;
        }
        $.ajax({
            url: '/rest/student/query',
            type: 'get',
            data: {
                name: new Mydropdown($('#student_search_type')).val(),
                value: $('#student_search_input').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#studentListNoData').hide();
                    fillStudentList(rs.data);
                }
            }
        });
    });


    $('#student_add_submit_btn').on('click', function(){
        var sl = $('#student_add_techer').val().split('|');
        $.ajax({
            url: '/rest/student/add',
            type: 'post',
            data: {
                name: $('#student_add_name').val(), 
                sex: $('#student_add_sex').val(), 
                age: $('#student_add_age').val(), 
                register: $('#student_add_home').val(), 
                baseUnit: $('#student_add_department').val(),
                techerId: sl[0],
                techerNumber: sl[1],
                techerName: sl[2]
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#studentNav').trigger('click');
            }
        });
    });
    $('#student_edit_submit_btn').on('click', function(){
        var sl = $('#student_edit_techer').val().split('|');
        $.ajax({
            url: '/rest/student/update',
            type: 'post',
            data: {
                id: $('#student_edit').attr('data-id'),
                name: $('#student_edit_name').val(), 
                sex: $('#student_edit_sex').val(), 
                age: $('#student_edit_age').val(), 
                register: $('#student_edit_home').val(), 
                baseUnit: $('#student_edit_department').val(),
                techerId: sl[0],
                techerNumber: sl[1],
                techerName: sl[2]
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#studentNav').trigger('click');
            }
        });
    });

    $('#studentNav').trigger('click');





    function fillCourseList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].id).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].name).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].purpose).html()+"</td>",

                    "<td>",
                    "<a data-id='"+list[i].id+"' class='mylink mycourse-del' href='javascript:void(0);'>删除</a></td>",
                    
                    "</tr>"
                ].join('');
            html += s;
        }
        $('#courseList').html(html);
        $('#courseList .mycourse-del').on('click', function(){
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/rest/course/delete',
                type: 'post',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function(rs){
                    if (rs.code != 200) {
                        layer.alert(rs.message);
                        return;
                    }
                    $('#courseNav').trigger('click');
                }
            });
        });
    }
    $('#courseNav').on('click', function(){
        $('#course_search_input').val('');
        $.ajax({
            url: '/rest/course/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#courseListNoData').hide();
                    fillCourseList(rs.data);
                }
            }
        });
    });
    $('#course_search_btn').on('click', function(){
        if (!$('#course_search_input').val()) {
            $('#courseNav').trigger('click');
            return;
        }
        $.ajax({
            url: '/rest/course/query',
            type: 'get',
            data: {
                name: new Mydropdown($('#course_search_type')).val(),
                value: $('#course_search_input').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#courseListNoData').hide();
                    fillCourseList(rs.data);
                }
            }
        });
    });

    $('#course_add_submit_btn').on('click', function(){
        $.ajax({
            url: '/rest/course/add',
            type: 'post',
            data: {
                name: $('#course_add_name').val(), 
                purpose: $('#course_add_purpose').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#courseNav').trigger('click');
            }
        });
    });

    function findAllCourse(callback){
        function fill(list){
            var html = "";
            for (var i=0; i<list.length; i++) {
                html += [
                    '<option value="'+[list[i].id, list[i].name].join('|')+'">',
                    list[i].name+'   '+list[i].techerName,
                    '</option>'
                ].join('');
            }
            $('#testPaper_add_course, #resource_add_course').html(html);
        }
        $.ajax({
            url: '/rest/course/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                fill(rs.data);
                callback && callback();
            }
        });
    }
    





    function fillTestPaperList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].id).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].courseName).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].point).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].content).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerA).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerB).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerC).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerD).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].rightAnswer).html()+"</td>",

                    "<td>",
                    "<a data-id='"+list[i].id+"' class='mylink mytestPaper-del' href='javascript:void(0);'>删除</a></td>",
                    
                    "</tr>"
                ].join('');
            html += s;
        }
        $('#testPaperList').html(html);
        $('#testPaperList .mytestPaper-del').on('click', function(){
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/rest/question/delete',
                type: 'post',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function(rs){
                    if (rs.code != 200) {
                        layer.alert(rs.message);
                        return;
                    }
                    $('#testPaperNav').trigger('click');
                }
            });
        });
    }
    $('#testPaperNav').on('click', function(){
        $('#testPaper_search_input').val('');
        $.ajax({
            url: '/rest/question/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#testPaperListNoData').hide();
                    fillTestPaperList(rs.data);
                }
            }
        });
    });
    $('#testPaper_search_btn').on('click', function(){
        if (!$('#testPaper_search_input').val()) {
            $('#testPaperNav').trigger('click');
            return;
        }
        $.ajax({
            url: '/rest/question/query',
            type: 'get',
            data: {
                name: new Mydropdown($('#testPaper_search_type')).val(),
                value: $('#testPaper_search_input').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#testPaperListNoData').hide();
                    fillTestPaperList(rs.data);
                }
            }
        });
    });

    $('#testPaper_add_btn').on('click', function(){
        findAllCourse();
    });
    $('#testPaper_add_submit_btn').on('click', function(){
        var sl = $('#testPaper_add_course').val().split('|');
        $.ajax({
            url: '/rest/question/add',
            type: 'post',
            data: {
                content: $('#testPaper_add_content').val(), 
                answerA: $('#testPaper_add_answerA').val(),
                answerB: $('#testPaper_add_answerB').val(),
                answerC: $('#testPaper_add_answerC').val(),
                answerD: $('#testPaper_add_answerD').val(),
                rightAnswer: $('#testPaper_add_rightAnswer').val(),
                point: $('#testPaper_add_point').val(),
                courseId: sl[0],
                courseName: sl[1]
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#testPaperNav').trigger('click');
            }
        });
    });











    function fillExaminationList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].id).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].point).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].courseName).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].techerName).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].time).html()+"</td>",                    
                    "</tr>"
                ].join('');
            html += s;
        }
        $('#examinationList').html(html);
    }
    $('#examinationNav').on('click', function(){
        $('#examination_search_input').val('');
        $.ajax({
            url: '/rest/grade/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#examinationListNoData').hide();
                    fillExaminationList(rs.data);
                }
            }
        });
    });
    $('#examination_search_btn').on('click', function(){
        if (!$('#examination_search_input').val()) {
            $('#examinationNav').trigger('click');
            return;
        }
        $.ajax({
            url: '/rest/grade/query',
            type: 'get',
            data: {
                name: new Mydropdown($('#examination_search_type')).val(),
                value: $('#examination_search_input').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#examinationListNoData').hide();
                    fillExaminationList(rs.data);
                }
            }
        });
    });






    function fillResourceList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].id).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].courseName).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].content).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].url).html()+"</td>",

                    "<td>",
                    "<a data-id='"+list[i].id+"' class='mylink myresource-del' href='javascript:void(0);'>删除</a></td>",

                    "</tr>"
                ].join('');
            html += s;
        }
        $('#resourceList').html(html);
        $('#resourceList .myresource-del').on('click', function(){
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/rest/resource/delete',
                type: 'post',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function(rs){
                    if (rs.code != 200) {
                        layer.alert(rs.message);
                        return;
                    }
                    $('#resourceNav').trigger('click');
                }
            });
        });
    }
    $('#resourceNav').on('click', function(){
        $.ajax({
            url: '/rest/resource/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#resourceListNoData').hide();
                    fillResourceList(rs.data);
                }
            }
        });
    });
    $('#resource_add_btn').on('click', function(){
        findAllCourse();
    });
    $('#resource_add_submit_btn').on('click', function(){
        var sl = $('#resource_add_course').val().split('|');
        $.ajax({
            url: '/rest/resource/add',
            type: 'post',
            data: {
                content: $('#resource_add_content').val(),
                url: $('#resource_add_url').val(),
                courseId: sl[0],
                courseName: sl[1]
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#resourceNav').trigger('click');
            }
        });
    });


});