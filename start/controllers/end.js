var mongoose = require('mongoose'),
    Blog = require('../models/blog'),
    Tag = require('../models/tag'),
    Topic = require('../models/topic');

Blog = mongoose.model('Blog');
Tag = mongoose.model('Tag');
Topic = mongoose.model('Topic');

/* 后台controller */
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
        Blog.find({_id: req.params.id}).exec(function (err, blog) {
            res.render('end/post', {
                layout: 'end',
                title: '发表文字',
                showPost: true,
                post: blog[0]
            });
        });
    });

    // 标签、分类管理页(未来需要拆分)
    app.get('/end/tag', checkLogin);
    app.get('/end/tag', function (req, res) {
        Tag.find({}).exec(function (err, tags) {
             res.render('end/topictag', {
                layout: 'end',
                title: '标签管理',
                showPost: true,
                differ: 'tag',
                topictags: tags
            });       
        });
    });
    app.get('/end/topic', checkLogin);
    app.get('/end/topic', function (req, res) {
        Topic.find({}).exec(function (err, topics) {
            res.render('end/topictag', {
                layout: 'end',
                title: '分类管理',
                showPost: true,
                differ: 'topic',
                topictags: topics
            });
        });
    });

    // 标签、分类操作
    app.post('/end/tagadd', checkLogin);
    app.post('/end/tagadd', function (req, res) {
        var newTag = new Tag({
            name: req.body.name
        });
        newTag.save();
        res.redirect('back');
    });
    app.post('/end/topicadd', checkLogin);
    app.post('/end/topicadd', function (req, res) {
        var newTopic = new Topic({
            name: req.body.name
        });
        newTopic.save();
        res.redirect('back');
    });
    app.get('/end/ttdel/:id', function (req, res) {
        console.log(req.params.id);
        // 此处暂时将tag、topic的删除功能写在一起
        Tag.remove({_id: req.params.id}, function (err, tt) {
            console.log('删除tag');
        });
        Topic.remove({_id: req.params.id}, function (err, tt) {
            console.log('删除topic');
        });

        res.redirect('back');
    });


    // 图片后台
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
