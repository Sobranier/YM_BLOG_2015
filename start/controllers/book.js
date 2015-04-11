var Test = require('../models/test'),
    superagent = require('superagent');

module.exports = function (app) {
    
    app.get('/booklist', function (req, res) {
        superagent.get('https://api.douban.com/v2/book/user/sobranier/collections')
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }
            var items = JSON.parse(sres.text).collections;
            res.render('pages/booklist', {
                info: items,
                title: '伟庆书单'
            });
        });
    });
};

