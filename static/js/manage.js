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

    $('#teacherNav').on('click', function(){
        
    });
});