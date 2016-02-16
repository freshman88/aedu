$(function(){

    var uname_key = 'uname', pw_key = 'pw';
    function remember_pw() {
        if (!$('#remember')[0].checked) {
            return;
        }
        if (typeof localStorage != "undefined") {
            localStorage.setItem(uname_key, $('#username').val());
            localStorage.setItem(pw_key, $('#password').val());
        }
    }

    function auto_fill_pw() {
        if (typeof localStorage != "undefined") {
            var uname = localStorage.getItem(uname_key),
                pw = localStorage.getItem(pw_key);
            if (uname != null && pw != null) {
                $('#username').val(uname);
                $('#password').val(pw);  
                $('#remember')[0].checked = true;
            }
        }
    }
    $('#remember').on('change', function(){
        if (typeof localStorage != "undefined" && !$(this)[0].checked) {
            localStorage.removeItem(uname_key);
            localStorage.removeItem(pw_key);
        }
    });

    $('#utype ul.dropdown-menu li').on('click', function(){
        var value = $(this).attr('data-value');
        switch(value){
            case 'admin': $('#usernameLabel').html('用户名'); break;
            case 'tech': $('#usernameLabel').html('工号'); break;
            case 'stu': $('#usernameLabel').html('学号'); break;
            default: break;
        }
    });


    auto_fill_pw();

    $('#submitBtn').on('click', function(){
        var uname = $('#username').val(), pw = $('#password').val();
        if (!uname) {
            alert('用户名不能为空');
            return;
        }
        if (!pw) {
            alert('密码不能为空');
            return;
        }

        var index = layer.load(1, {
            shade: [0.3, '#000']
        });

        $.ajax({
            url: '/rest/auth/login',
            type: 'post',
            data: {
                uname: uname,
                pw: pw,
                utype: new Mydropdown($('#utype')).val()
            },
            dataType: 'json',
            success: function(rs){
                if (rs.code != 200) {
                    layer.close(index);
                    layer.alert(rs.message);
                    return;
                }
                remember_pw();
                location.href = '/manage';
            }
        })
    });

});

