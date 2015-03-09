var mongoose = require('mongoose'),
    marked = require('marked'),
    Blog = require('../models/blog'),
    Tag = require('../models/tag'),
    Topic = require('../models/topic');

Blog = mongoose.model('Blog');
Tag = mongoose.model('Tag');
Topic = mongoose.model('Topic');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
    //highlight: highlight
});

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
    app.get('/end/paperedit/:id?', checkLogin);
    app.get('/end/paperedit/:id?', function (req, res) {
        Blog.findOne({_id: req.params.id}).exec(function (err, blog) {
            Tag.find({}).exec(function (err, tags) {
                Topic.find({}).exec(function (err, topics) {
                    if (blog) {

                        for (var i = 0; i < blog.tags.length; i ++) {
                            for (var j = 0; j < tags.length; j ++) {
                                if (tags[j].name == blog.tags[i]) {
                                    tags[j].selected = true;
                                    break;
                                }
                            }
                        }
                        for (var i = 0; i < blog.topics.length; i ++) {
                            for (var j = 0; j < topics.length; j ++) {
                                if (topics[j].name == blog.topics[i]) {
                                    topics[j].selected = true;
                                    break;
                                }
                            }
                        }
                        
                        if (blog.ifpublic) {
                            blog.status = true;
                        }
                        console.log(blog.ifsafe);
                        if (!blog.ifsafe) {
                            blog.safestatus = true;
                        }
                    } else {
                        blog = {};
                        blog.date = new Date();
                    }

                    res.render('end/post', {
                        layout: 'end',
                        title: '发表文字',
                        showPost: true,
                        tags: tags,
                        topics: topics,
                        post: blog
                    });               
                });
            });
        });
    });
    app.get('/end/preview/:alias?', checkLogin);
    app.get('/end/preview/:alias?', function (req, res) {
        Blog.findOne({alias: req.params.alias}).exec(function (err, blog) {
            var date = blog.date;
            blog.day = (date.getMonth() + 1) + "-" + date.getDate();
            blog.year = date.getFullYear();

            var content = blog.content.replace(/\\n/g, '\n');
            blog.content = marked(content);

            res.render('end/paper', {
                layout: 'end',
                title: blog.title + ' - 寿百年',
                post: blog
            });
        });
    });

    // 删除文章是比较严重的操作，前后端都需要再三验证
    app.post('/end/delBlog/:id', checkLogin);
    app.post('/end/delBlog/:id', function (req, res) {
        Blog.findOne({_id: req.params.id}).exec(function (err, blog) {
            if (!blog.ifsafe) {
                blog.remove();
                res.json({
                    success: true,
                    ret: '删除成功'
                });
            } else {
                res.json({
                    success: false,
                    ret: '保护锁定对象不能被删除'
                });
            }
        });
    });

    // 更新文章状态
    app.post('/end/updateBlogStatus', checkLogin);
    app.post('/end/updateBlogStatus', function (req, res) {
        console.log(req.body);
        Blog.findOne({_id: req.body.id}).exec(function (err, blog) {
            blog.set({ifpublic: req.body.status});
            blog.save();
        });
    });
    app.post('/end/editBlog', checkLogin);
    app.post('/end/editBlog', function (req, res) {
        var params = req.body,
            id = params.id;
        params.ifpublic = (params.ifpublic == 1) ? true : false;
        params.ifsafe = (params.ifsafe == 1) ? true : false;
        var newBlog = new Blog({
            title: params.title,
            date: params.date,
            content: params.content,
            summary: params.summary,
            alias: params.alias,
            topics: params.topics,
            tags: params.tags,
            ifpublic: params.ifpublic,
            ifsafe: params.ifsafe
        });
        if (id != '') {
            Blog.findOne({_id: id}).exec(function (err, blog) {
                // 有待优化，写这么丑你女朋友们知道么
                blog.set({title: params.title});
                blog.set({date: params.date});
                blog.set({content: params.content});
                blog.set({summary: params.summary});
                blog.set({alias: params.alias});
                blog.set({topics: params.topics});
                blog.set({tags: params.tags});
                blog.set({ifpublic: params.ifpublic});
                blog.set({ifsafe: params.ifsafe});
                blog.save()
            });
        } else {
            newBlog.save();
        }
        res.json({
            alias: params.alias
        });
        //res.redirect('/end/preview/' + params.alias);
    });


    // 标签、分类管理页(未来需要拆分,因为分类界面的侧边栏需要写在数据当中)
    app.get('/end/tags', checkLogin);
    app.get('/end/tags', function (req, res) {
        Tag.find({}).exec(function (err, tags) {
             res.render('end/tags', {
                layout: 'end',
                title: '标签管理',
                showPost: true,
                tags: tags
            });       
        });
    });
    app.get('/end/topics', checkLogin);
    app.get('/end/topics', function (req, res) {
        Topic.find({}).exec(function (err, topics) {
        console.log(topics);
            res.render('end/topics', {
                layout: 'end',
                title: '分类管理',
                showPost: true,
                topics: topics
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
        var newTopic = new Topic(req.body);
        newTopic.save();
        res.redirect('back');
    });
    app.post('/end/tagdel/:id', checkLogin);
    app.post('/end/tagdel/:id', function (req, res) {
        Tag.remove({_id: req.params.id}, function (err, tt) {
            res.json({
                success: true,
                ret: '删除成功'
            });
        });
    });
    app.post('/end/topicdel/:id', checkLogin);
    app.post('/end/topicdel/:id', function (req, res) {
        Topic.remove({_id: req.params.id}, function (err, tt) {
            res.json({
                success: true,
                ret: '删除成功'
            });
        });
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
        console.log("检验是否在线————在线账号:" + req.session.user);
        if (!req.session.user) {
            console.log('未检测到在线!!!');
            res.redirect('/login');
        } else {
            next();
        }
    }
};
