requirejs.config({
    paths: {
        jquery: 'vendor/jquery.min',     
        flatui: 'vendor/flat-ui.min',
        highlight: 'vendor/highlight.min'
    },
    shim: {
        flatui: ['jquery']      
    }
});

requirejs(['jquery', 'flatui'], function($) {
    // 顶部菜单栏
    $('#navbarToggle').bind('click', function () {
        $('#collapseNav').toggleClass('collapse');
    });
    // 左侧悬浮框
    $('[data-toggle="tooltip"]').tooltip();

    // 加载完成后操作
    $(document).ready(function(){
        $('.feature-cover').removeClass('loading-hidden');
        $('.main-wrapper').removeClass('loading-change');
        setTimeout(function(){
            $('.feature-cover').find('h3').css('display', 'block');
            $('.feature-cover').find('p').css('display', 'block');
        }, 700);
    });

    // serialized相关，具体功能未知
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };


});



/*
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
*/
