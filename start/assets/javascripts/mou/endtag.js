define(['jquery', 'flatui', 'base'], function ($) {
    $('a.fui-cross').bind('click', function () {
        var parentNode = $(this).parent().parent('div');
        if (confirm('确认删除标签"' + $(this).attr('data-name') + '"?')) {
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
});
