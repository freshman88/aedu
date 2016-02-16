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









});