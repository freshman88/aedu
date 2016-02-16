$(function(){

    var $dropdown = $('.dropdown');
    var $selected = $dropdown.find('button.dropdown-toggle span.my-selected');
    $dropdown.find('ul.dropdown-menu li').on('click', function(){
        var tmp = {
            name: $(this).find('a').text(),
            value: $(this).attr('data-value')
        };
        $(this).find('a').text($selected.html());
        $(this).attr('data-value', $selected.attr('data-value'));

        $selected.html(tmp.name);
        $selected.attr('data-value', tmp.value);
    });

    var Mydropdown = window.Mydropdown = function($el){
        this.el = $el;
    };
    Mydropdown.prototype.val = function(v){
        if (v) {
            if (v != this.val()) {
                var index = 0, $li_list = this.el.find('ul.dropdown-menu li');
                for (var i=0; i<$li_list.length; i++) {
                    if (v == $li_list[i].attr('data-value')) {
                        index = i;
                        break;
                    }
                }
                $li_list.eq(i).trigger('click');
            }
        } else {
            return this.el.find('button.dropdown-toggle span.my-selected').attr('data-value');
        }
    }
    
});

