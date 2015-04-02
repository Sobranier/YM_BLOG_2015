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
    $('#navbarToggle').bind('click', function () {
        $('#collapseNav').toggleClass('collapse');
    });
    $('[data-toggle="tooltip"]').tooltip();

    $(document).ready(function(){
        $('.feature-cover').removeClass('loading-hidden');
        $('.main-wrapper').removeClass('loading-change');
    });

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
