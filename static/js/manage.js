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
                    "</tr>"
                ].join('');
            html += s;
        }
        $('#teacherList').html(html);
    }
    $('#teacherNav').on('click', function(){
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

    $('#teacherNav').trigger('click');
});