var cheerio = require('cheerio'),
    superagent = require('superagent');


module.exports = function (app) {
    app.get('/tt', function(req, res, next) {
        /*
        superagent.get('https://cnodejs.org/')
            .end(function(err, sres) {
                if (err) {
                    return next(err);
                }
                var $ = cheerio.load(sres.text);
                var items = [];
                $('#topic_list .topic_title').each(function (idx, element) {
                    var $element = $(element);
                    items.push({
                        title: $element.attr('title'),
                        href: $element.attr('href')
                    });
                });

                res.render('pages/test', {
                    info: items
                });
            });

            */
        superagent.get('https://api.douban.com/v2/book/user/sobranier/collections')
            .end(function(err, sres) {
                if (err) {
                    return next(err);
                }
                var items = JSON.parse(sres.text).collections;
                console.log(typeof items);
                res.render('pages/test', {
                    info: items
                });
            })
    });

};
