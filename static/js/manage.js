$(function(){
    $('#leftNav li').on('click', function(){
        $('#leftNav li').removeClass('active');
        $(this).addClass('active');

        $('.main').hide();
        $('#'+$(this).attr('content-id')).show();
    });
      $('#teacher_add_btn').on('click', function(){
        $('.main').hide();
        $('#teacher_add').show();
    });
    $('#student_add_btn').on('click', function(){
        $('.main').hide();
        $('#student_add').show();
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




    function fillTeacherList(list) {
        var html = "", s;
        for (var i=0; i<list.length; i++) {
            s = [
                    "<tr>",
                    "<td>"+$('<div>').text(list[i].number).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].name).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].sex).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].age).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].techAge).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].baseUnit).html()+"</td>",

                    "<td><a data-id='"+list[i].id+"' class='mylink mytech-edit' href='javascript:void(0);'>修改</a>",
                    "<a data-id='"+list[i].id+"' class='mylink mytech-del' href='javascript:void(0);'>删除</a></td>",
                    
                    "</tr>"
                ].join('');
            html += s;
        }
        $('#teacherList').html(html);
        $('#teacherList .mytech-edit').on('click', function(){
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/rest/techer/'+id,
                type: 'get',
                dataType: 'json',
                success: function(rs){
                    if (rs.code != 200) {
                        layer.alert(rs.message);
                        return;
                    }
                    var data = rs.data;
                    $('#teacher_edit_name').val(data.name);
                    $('#teacher_edit_sex').val(data.sex);
                    $('#teacher_edit_age').val(data.age);
                    $('#teacher_edit_years').val(data.techAge);
                    $('#teacher_edit_department').val(data.baseUnit);
                    $('#teacher').hide();
                    $('#teacher_edit').attr('data-id', id).show();
                }
            });
        });
        $('#teacherList .mytech-del').on('click', function(){
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/rest/techer/delete',
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
                    $('#teacherNav').trigger('click');
                }
            });
        });
    }

    $('#teacherNav').on('click', function(){
        $('#eacher_search_input').val('');
        $.ajax({
            url: '/rest/techer/list',
            type: 'get',
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#teacherListNoData').hide();
                    fillTeacherList(rs.data);
                }
            }
        });
    });
    $('#teacher_search_btn').on('click', function(){
        if (!$('#eacher_search_input').val()) {
            $('#teacherNav').trigger('click');
            return;
        }
        $.ajax({
            url: '/rest/techer/query',
            type: 'get',
            data: {
                name: new Mydropdown($('#eacher_search_type')).val(),
                value: $('#eacher_search_input').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                if (rs.data.length) {
                    $('#teacherListNoData').hide();
                    fillTeacherList(rs.data);
                }
            }
        });
    });
    
    $('#teacher_add_btn2').on('click', function(){
        $.ajax({
            url: '/rest/techer/add',
            type: 'post',
            data: {
                name: $('#teacher_add_name').val(), 
                sex: $('#teacher_add_sex').val(), 
                age: $('#teacher_add_age').val(), 
                techAge: $('#teacher_add_years').val(), 
                baseUnit: $('#teacher_add_department').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#teacherNav').trigger('click');
            }
        });
    });
    $('#teacher_edit_btn2').on('click', function(){
        $.ajax({
            url: '/rest/techer/update',
            type: 'post',
            data: {
                id: $('#teacher_edit').attr('data-id'),
                name: $('#teacher_edit_name').val(), 
                sex: $('#teacher_edit_sex').val(), 
                age: $('#teacher_edit_age').val(), 
                techAge: $('#teacher_edit_years').val(), 
                baseUnit: $('#teacher_edit_department').val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.alert(rs.message);
                    return;
                }
                $('#teacherNav').trigger('click');
            }
        });
    });

    $('#teacherNav').trigger('click');





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
                    "<td>"+$('<div>').text(list[i].techerName).html()+"</td>",
                    "<td>"+$('<div>').text(list[i].techerNumber).html()+"</td>",

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
                    findAllTeacher(rs.data);
                }
            }
        });
    });


    $('#student_add_submit_btn').on('click', function(){
        var sl = $('#student_edit_techer').val().split('|');
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


});