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

    // 列表页
    app.get('/end/postslist', checkLogin);
    app.get('/end/postslist', function (req, res) {
        res.render('end/postslist', {
            layout: 'end',
            title: '文章列表',
            showPost: true
        });
    });

    // 修改页
    app.get('/end/paperedit', checkLogin);
    app.get('/end/paperedit', function (req, res) {
        res.render('end/post', {
            layout: 'end',
            title: '发表文字',
            showPost: true
        });
    });
    app.get('/end/paperedit/:id', checkLogin);
    app.get('/end/paperedit/:id', function (req, res) {
        res.render('end/post', {
            layout: 'end',
            title: '发表文字',
            showPost: true
        });
    });


    app.get('/end/pic', checkLogin);
    app.get('/end/pic', function (req, res) {
        res.render('end/pic', {
            layout: 'end',
            title: '图片后台',
            showPic: true
        });
    });

    app.get('/end/music', checkLogin);
    app.get('/end/music', function (req, res) {
        res.render('end/music', {
            layout: 'end',
            title: '音乐控制',
            showMusic: true
        });
    });

    app.get('/end/book', checkLogin);
    app.get('/end/book', function (req, res) {
        res.render('end/book', {
            layout: 'end',
            title: '书籍后台',
            showBook: true
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
