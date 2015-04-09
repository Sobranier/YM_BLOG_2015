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

    // 返回顶部
    if (/music/.test(location.href)) {
    } else {
        $('.J-up-top').on('click', function() {
            $('body').animate({scrollTop: 0}, '500');
        });
    }

    // 获取浏览器高度
    function getWindowHeight() {
        return $(window).height();
    }

    // 获取浏览器宽度
    function getWindowWidth() {
        return $(window).width();
    }
    
    // 获取滚动高度
    function getWindowScroll() {
        return $(document).scrollTop();
    }

    var windowScroll = {
        w_height: getWindowHeight(),
        onReady: function() {
            console.log(getWindowHeight());
            $(window).on('scroll', function() {
                this.checkScroll();
            });
            $(window).on('resize', function() {
                this.checkScroll();
            });
        },
        checkScroll: function() {
            consol.log(getWindowHeight()); 
            console.log(w_height);
        }
    };
    $(document).ready(windowScroll.onReady);

/*
*        $(window).scroll(function(){
*                    var w_height = $(window).height();//浏览器高度
*                                var scroll_top = $(document).scrollTop();//滚动条到顶部的垂直高度
*                                            if(scroll_top > w_height){
*                                                                $("#goto-top").fadeIn(500);
*                                                                                }else{
*                                                                                                    $("#goto-top").fadeOut(500);
*                                                                                                                }
*                                                                                                                        });
* */

    /*

var PI = {
        onReady : function() {
                              $('#magic').click(PI.candyMtn);
                                      $('#happiness').load(PI.url + ' #unicorns', PI.unicornCb);
                                          },

            candyMtn : function(e) {
                                   $('#yayeffects').slideUp(PI.slideCb);
                                       },

                slideCb : function() { ... },

                    unicornCb : function() { ... }
};

$(document).ready(PI.onReady);

*/

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
