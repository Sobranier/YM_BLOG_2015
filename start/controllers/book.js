var Test = require('../models/test'),
    superagent = require('superagent');

module.exports = function (app) {
    
    app.get('/booklist', function (req, res) {
        var bookStatus = {
            'wish': '想读',
            'reading': '在读',
            'read': '读过'
        };
        superagent.get('https://api.douban.com/v2/book/user/sobranier/collections')
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }
            var items = JSON.parse(sres.text).collections;
            for (var i = 0, length = items.length; i < length; i ++) {
                items[i].status = bookStatus[items[i].status];
            }
            
            res.render('pages/booklist', {
                info: items,
                title: '伟庆书单'
            });
        });
    });
};

