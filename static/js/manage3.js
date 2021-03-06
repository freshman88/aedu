$(function(){

    $('#leftNav li').on('click', function(){
        $('#leftNav li').removeClass('active');
        $(this).addClass('active');

        $('.main').hide();
        $('#'+$(this).attr('content-id')).show();
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



    function fillCourseList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].id).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].name).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].purpose).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].techerName).html()+"</td>",

                    
                    "</tr>"
                ].join('');
            html += s;
        }
        $('#courseList').html(html);
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

    $('#courseNav').trigger('click');





    function fillResourceList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].id).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].courseName).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].content).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].url).html()+"</td>",


                    "</tr>"
                ].join('');
            html += s;
        }
        $('#resourceList').html(html);
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




    function fillExaminationList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].id).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].totalPoint).html()+"</td>",
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
            $('#exam_ready_course').html(html);
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
    $('#examNav').on('click', function(){
        findAllCourse();
        $('#exam_start').hide();
    });

    function fillExamList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr data-id='"+list[i].id+"'>",
                    "<td>"+$('<div>').text(list[i].content).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].point).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerA).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerB).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerC).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].answerD).html()+"</td>",

                    "<td>",
                    "<select class='form-control mysel-answer'>",
                    "<option value='A'>A</option>",
                    "<option value='B'>B</option>",
                    "<option value='C'>C</option>",
                    "<option value='D'>D</option>",
                    "</select>",
                    "</td>", 

                    "</tr>"
                ].join('');
            html += s;
        }
        $('#examNoList').html(html);
    }
    $('#exam_ready_submit_btn').on('click', function(){
        $('#exam_ready').hide();
        $('#exam_start').show();
        var sl = $('#exam_ready_course').val();
        $.ajax({
            url: '/rest/question/exam',
            type: 'get',
            data: {
                courseId: sl[0]
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#examNoData').hide();
                    fillExamList(rs.data);
                }
            }
        });
    });

    $('#exam_submit_btn').on('click', function(){
        var ids = [], answers = [];
        $('#examNoList tr').each(function(i, tr){
            ids.push($(tr).attr('data-id'));
            answers.push($(tr).find('.mysel-answer').val());
        });
        if (!ids.length) {
            $('#exam_ready').hide();
            $('#exam_start').show();
            return;
        }

        var sl = $('#exam_ready_course').val();
        $.ajax({
            url: '/rest/question/grade',
            type: 'post',
            data: {
                courseId: sl[0],
                ids: ids.join(','),
                answers: answers.join(',')
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#examinationNav').trigger('click');
            }
        });
    });


});