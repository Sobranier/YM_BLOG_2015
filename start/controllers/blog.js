var mongoose = require('mongoose'),
    Blog = require('../models/blog'),
    Tag = require('../models/tag'),
    Topic = require('../models/topic');

Blog = mongoose.model('Blog');
Tag = mongoose.model('Tag');
Topic = mongoose.model('Topic');

module.exports = function (app) {
    app.get('/', function(req, res) {
        Blog.count({}, function (err, total) {
            Blog.find({}).sort({'date':-1}).limit(3).exec(function (err, blogs) {
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
                    posts: blogs
                });
            });
        });

    });

    // 搜索
    app.post('/posts/search', function (req, res) {
        getPaperList(res, req.body, true);
    });

    // blog列表界面
    app.get('/blog', function (req, res) {
        var params = {
            page: req.query.page ? parseInt(req.query.page) : 1,
            ifpublic: true,
            data: {
                title: '日志 - 寿百年',
                file: {
                    name: '所有日志',
                    title: '所有日志',
                    content: [
                        '测试测试测试1',
                        '测试测试测试2',
                        '测试测试测试3',
                    ]
                }
            }
        }
        getPaperList(res, params, false);
    });

    // tag列表界面
    app.get('/tags/:tag', function (req, res) {
        var params = {
            page: req.query.page ? parseInt(req.query.page) : 1,
            tag: req.params.tag,
            ifpublic: true,
            data: {
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
            }
        }
        getPaperList(res, params, false);
    });

    // topic列表界面
    app.get('/topics/:topic', function (req, res) {
        Topic.findOne({name: req.params.topic}).exec(function (err, topic) {
            if (topic) {
                var params = {
                    page: req.query.page ? parseInt(req.query.page) : 1,
                    topic: req.params.topic,
                    ifpublic: true,
                    data: {
                        title: topic.name + ' - 寿百年',
                        file: topic,
                        kind: '文章列表'
                    }
                }
                getPaperList(res, params, false);
            } else {
                // 此类重定向未来需要重新考虑
                res.redirect('/topics'); 
            }
        });
    })

    app.get('/archives/:year/:month/:day?', function (req, res) {
        var year = req.params.year,
            month = req.params.month,
            day = req.params.day;
        
        if (day) {
            var st = new Date(year, month-1, day),
                et = new Date(year, month-1, day);
            et.setDate(et.getDate() + 1);
        } else {
            var st = new Date(year, month-1, 1);
            if (month == 11) {
                var et = new Date(year+1, 0, 1);
            } else {
                var et = new Date(year, month, 1);
            }
        }
        var params = {
            page: req.query.page ? parseInt(req.query.page) : 1,
            ifpublic: true,
            time: {
                st: st,
                et: et
            },
            data: {
                title: '时间分类' + ' - 寿百年',
                file: {
                    title: '时间测试',
                    content: [
                        '你好吗1',
                        '你妹1',
                        '2你'
                    ]
                },
                kind: '文章时间'
            }
        }
        getPaperList(res, params, false);
    });

    // 单个文章界面（可以和后台preview界面做一些联系）
    app.get('/blog/:alias', function (req, res) {
        Blog.findOne({alias: req.params.alias}).exec(function (err, blog) {
            var date = blog.date;
            blog.day = (date.getMonth() + 1) + "-" + date.getDate();
            blog.year = date.getFullYear();
            res.render('front/paper', {
                title: blog.title,
                post: blog
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

    // 前台分类页面
    app.get('/topics', function (req, res) {
        Topic.find({}).exec(function (err, topics) {
            res.render('front/topic', {
                title: '分类列表',
                topics: topics
            });
        });
    });



    // 前台历史
    app.get('/archives/?:year', function (req, res) {
        res.render('front/archives', {
            title: '文章存档'
        });
    });

    // 获取文章列表的函数
    function getPaperList (res, params, isAjax) {
        var pageNum = params.page ? parseInt(params.page) : 1,
            re = new RegExp(params.title, 'i'),
            pageSize = 10;
        
        // 过滤条件
        var config = {};
        config.ifpublic = params.ifpublic;
        config.title = {$regex: re};
        if (params.tag) {
            config.tags = params.tag;
        }
        if (params.topic) {
            config.topics = params.topic;
        }
        if (params.time) {
            config.date = {$gte: params.time.st, $lt: params.time.et};
        }
        console.log(config);

        Blog.count(config, function (err, total) {
            // 保障页码合法性
            var number = Math.ceil(total/pageSize); //总页码数
            pageNum = (pageNum < 1) ? 1 : pageNum;
            pageNum = (pageNum > number) ? number : pageNum;    //当前页码

            Blog.find(config).sort({'date':-1}).skip(pageSize*(pageNum-1)).limit(pageSize).exec(function (err, blogs) {

                for (var index in blogs) {
                    var date = blogs[index].date;
                    blogs[index].day = (date.getMonth() + 1) + "-" + date.getDate();
                    blogs[index].year = date.getFullYear();
                }

                if (isAjax) {
                    res.json({
                        posts: blogs,
                        page: {
                            total: total,
                            pageNum: pageNum,
                            number: Math.ceil(total/pageSize)
                        }
                    });
                } else {
                    var notFirstPage = ((pageNum - 1) != 0),
                        notLastPage = (pageNum != number),
                        relatePage = {};
                    if (notFirstPage) {
                        relatePage.notFirstPage = true;
                        relatePage.prePage = pageNum - 1;
                    }
                    if (notLastPage) {
                        relatePage.notLastPage = true;
                        relatePage.nextPage = pageNum + 1;
                    }
                
                    params.data.posts = blogs;
                    params.data.relatePage = relatePage;
                    res.render('front/paperlist', params.data);
                }
            });
        });
    }
}
