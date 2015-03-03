var mongoose = require('mongoose'),
    Blog = require('../models/blog'),
    Tag = require('../models/tag'),
    Topic = require('../models/topic');

Blog = mongoose.model('Blog');
Tag = mongoose.model('Tag');
Topic = mongoose.model('Topic');

module.exports = function (app) {
    app.get('/', function(req, res) {
        /*
        var newBlog = new Blog({
            title: '测试0018',
            date: new Date(),
            content: '本文记录了美团在推广webp的一方面实践，虽然本人负责主要的实施，但领导及同事们提供了很大的帮助，包括方案的讨论及选定和后期文章的审阅等等。本文除了大记录了如何实施，还分享了整个效果评估的方案，总的来说是对新技术的一些尝试。更多内容可以去http://fe.meituan.com观看。',
            summary: '这是测试的贱贱贱加加加加123',
            alias: 'test0018',
            topics: ['JavaScript', 'life0003'],
            tags: ['Html', 'JavaScript', 'Node', '前端', 'life0002'],
            ifpublic: true,
            ifsafe: true
        });
        newBlog.save();
        */

        var page = req.query.p ? parseInt(req.query.p) : 1;

        Blog.count({}, function (err, total) {
            Blog.find({}).sort({'date':-1}).skip(10*(page-1)).limit(10).exec(function (err, blogs) {
                var notFirstPage = ((page - 1) != 0),
                    notLastPage = (((page - 1) * 10 + blogs.length) != total),
                    relatePage = {};
                if (notFirstPage) {
                    relatePage.notFirstPage = true;
                }
                if (notLastPage) {
                    relatePage.notLastPage = true;
                }
                for (var index in blogs) {
                    var date = blogs[index].date;
                    blogs[index].day = (date.getMonth() + 1) + "-" + date.getDate();
                    blogs[index].year = date.getFullYear();
                }
                res.render('home', {
                    title: 'YANWEIQING',
                    file: {
                        name: '最近更新',
                        title: '勿忘初衷',
                        content: [
                            '测试测试测试1',
                            '测试测试测试2',
                            '测试测试测试3',
                        ]
                    },
                    posts: blogs,
                    relatePage: relatePage
                });
            });
        });

    });

    app.post('/posts/search', function (req, res) {
        getPaperList(res, req.body);
    });

    app.get('/posts/:alias', function (req, res) {
        Blog.find({alias: req.params.alias}).exec(function (err, blogs) {
            var date = blogs[0].date;
            blogs[0].day = (date.getMonth() + 1) + "-" + date.getDate();
            blogs[0].year = date.getFullYear();
            res.render('front/paper', {
                title: blogs[0].title,
                post: blogs[0]
            });
        });
    });


    // 前台标签页面
    app.get('/tags', function (req, res) {
        Tag.find({}).exec(function (err, tags) {
            res.render('front/tag', {
                title: '标签列表',
                tags: tags
            });
        });
    });
    app.get('/tags/:tag', function (req, res) {
        console.log(req.params.tag);
        res.render('front/paperlist', {
            title: req.params.tag + ' - 寿百年',
            file: {
                title: '随笔测试',
                content: [
                    '你好吗',
                    '你妹',
                    '你'
                ]
            },
            kind: '文章列表'
        }); 
    });

    // 前台分类页面
    app.get('/topics', function (req, res) {
        Topic.find({}).exec(function (err, topics) {
            res.render('front/topic', {
                title: '分类列表',
                topics: topics
            });
        });
    });
    app.get('/topics/:topic', function (req, res) {
        console.log(req.params.topic);
        Topic.find({name: req.params.topic}).exec(function (err, topic) {
            if (topic.length > 0) {
                res.render('front/paperlist', {
                    title: topic[0].name + ' - 寿百年',
                    file: topic[0],
                    kind: '分类列表'
                });
            } else {
                res.redirect('/'); 
            }
        });
    })

    // 前台历史
    app.get('/archives', function (req, res) {
        res.render('front/archives', {
            title: '文章存档'
        });
    });

    // 获取文章列表的函数
    function getPaperList (res, params) {
        var pageNum = params.page ? params.page : 1,
            re = new RegExp(params.title, 'i');

        Blog.count({'ifpublic': params.ifpublic, 'title': {$regex: re}}, function (err, total) {
            var number = Math.ceil(total/10);
            pageNum = (pageNum < 1) ? 1 : pageNum;
            pageNum = (pageNum > number) ? number : pageNum;

            Blog.find({'ifpublic': params.ifpublic, 'title': {$regex: re}}).sort({'date':-1}).skip(10*(pageNum-1)).limit(10).exec(function (err, blogs) {
                for (var index in blogs) {
                    var date = blogs[index].date;
                    blogs[index].day = (date.getMonth() + 1) + "-" + date.getDate();
                    blogs[index].year = date.getFullYear();
                }
                res.json({
                    posts: blogs,
                    page: {
                        total: total,
                        pageNum: pageNum,
                        number: Math.ceil(total/10)
                    }
                });

            });
        });



    }
}
