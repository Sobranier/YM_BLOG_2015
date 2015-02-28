var mongoose = require('mongoose');

/* GET home page. */
module.exports = function (app) {

    app.get('/end', checkLogin);
    app.get('/end', function (req, res) {
      res.render('end/dashboard', {
          layout: 'end',
          title: 'BACK DASHBOARD'
      });
    });

    app.get('/end/post', checkLogin);
    app.get('/end/post', function (req, res) {
        res.render('end/post', {
            layout: 'end',
            title: '发表文字'
        });
    });

    app.get('/end/postslist', checkLogin);
    app.get('/end/postslist', function (req, res) {
        res.render('end/postslist', {
            layout: 'end',
            title: '文章列表'
        });
    });


    /*路由匹配不成功*/
    app.get('/end/*', checkLogin);
    app.get('/end/*', function (req, res) {
        res.redirect('/end');
    });

    function checkLogin (req, res, next) {
        console.log("检验是否在线——" + req.session.user);
        if (!req.session.user) {
            console.log('未检测到在线');
            res.redirect('/login');
        } else {
            next();
        }
    }
};
