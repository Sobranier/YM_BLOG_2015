define(['jquery', 'flatui', 'base'], function ($) {
    $('#form_submit').click(function(event){
        event.preventDefault();
        var params = $('form').serializeObject();
        if (params.title == '' || params.content == '' || params.alias == '' || params.date == '' || params.summary == '') {
            alert('有必填项目没有填写');
        } else {
            $.post('/end/editBlog',
            params,
            function (data, status) {
                if (status == 'success') {
                    location.href='/end/preview/' + data.alias;
                } else {
                    alert('数据加载失败');
                }
            });     
        }
    });
    $("select").select2({dropdownCssClass: 'dropdown-inverse'});
});

