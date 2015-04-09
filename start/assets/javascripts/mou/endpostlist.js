define(['jquery', 'flatui', 'base'], function ($) {
    $('#form_submit').bind('click', function(event){
        event.preventDefault();
        updateTable($("form").serialize());
    });

    $('#table_pagination').delegate('a','click',function(event){
        event.preventDefault();
        var params = $("form").serializeObject();
        params.page = $(this).attr('data-page');
        updateTable(params);
    });

    $("select").select2({dropdownCssClass: 'dropdown-inverse'});

    function updateTable (params) {
        $.post('/posts/search',
        params,
        function (data, status) {
            if (status == 'success') {
                $('#table_search').empty();
                for (var i = 0; i < data['posts'].length; i ++) {
                    var pos = data['posts'][i],
                        statuschecked = pos['ifpublic'] ? 'checked' : '',
                        safechecked = pos['ifsafe'] ? 'checked' : '',
                        tr ="<tr>" +
                            "   <td>" + pos['_id'] + "</td>" +
                            "   <td>" + pos['title'] + "</td>" +
                            "   <td>" + pos['date'] + "</td>" +
                            "   <td><input class='J-switch' type='checkbox' " + statuschecked + " data-toggle='switch' data-on-color='primary' data-off-color='default' data-id='" + pos['_id'] + "'/>" + "</td>" +
                            "   <td><input type='checkbox' " + safechecked + " disabled data-toggle='switch'/></td>" +
                            "   <td><a class='fui-eye' rel='预览' target='_blank' href='/end/preview/" + pos['alias'] + "'>预</a><a class='fui-new' rel='编辑' target='_blank' href='/end/paperedit/" + pos['_id'] + "'>编</a><a class='fui-trash' rel='删除' data-url='/end/delBlog/" + pos['_id'] + "'>删</a></td>" +
                            "</tr>";
                    $('#table_search').append($(tr));
                }
                $('a.fui-trash').bind('click', function () {
                    if (confirm('确认删除文章?')){
                        delBlog($(this));
                    }
                });
                $('input[type="checkbox"]').bootstrapSwitch();
                $('.bootstrap-switch').bind('click', function () {
                    updateSwitch($(this));
                });

                createPagination(data.page);
            } else {
                alert('数据加载失败');
            }
        });
    }

    // 删除文章
    function delBlog (node) {
        $.post(node.attr('data-url'),
        {},
        function (data, status) {
            if (status == 'success') {
                if (!data.success) {
                    alert(data.ret);
                } else {
                    console.log(data.ret);
                    node.parent().parent('tr').remove();
                }
            } else {
                alert('数据操作失败');
            }
            
        });
    }

    // switch切换
    function updateSwitch (node) {
        var target = node.find('input.J-switch');
        if (target.length > 0) {
            $.post('/end/updateBlogStatus', {
                id: target.attr('data-id'),
                status: node.hasClass('bootstrap-switch-on')
            }, function (data, status) {
                if (status == 'success') {
                } else {
                    alert('数据操作失败');
                }
            });
        }
    };

    // 制作分页
    function createPagination (page) {
        $('#table_pagination').empty();
        var pg = "<li class='previous'><a data-page='" + (page.pageNum-1) + "'>← Previous</a></li>";
        for (var i = 0; i < page.number; i ++) {
            pg += "<li><a data-page='" + (i+1) + "'>" + (i+1) + "<a></li>";
        }
        pg += "<li class='next'><a data-page='" + (page.pageNum-0+1) + "'>Newer →</a></li>";
        $('#table_pagination').append($(pg));
    }


});
