define(['jquery', 'flatui', 'base'], function ($) {
    $('a.fui-cross').bind('click', function () {
        var parentNode = $(this).parent().parent().parent('.panel').parent('div');
        if (confirm('确认删除分类"' + $(this).attr('data-name') + '"?')) {
            $.post($(this).attr('data-url'),
            {},
            function (data, status) {
                if (status == 'success') {
                    parentNode.remove();
                } else {
                    alert('操作失败');
                }
            });
        }
    });

    $("select").select2({dropdownCssClass: 'dropdown-inverse'});
});
