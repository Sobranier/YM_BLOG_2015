var mongoose = require('mongoose'),
    marked = require('marked'),
    Blog = require('../models/blog'),
    Tag = require('../models/tag'),
    Topic = require('../models/topic');

Blog = mongoose.model('Blog');
Tag = mongoose.model('Tag');
Topic = mongoose.model('Topic');

var highlight = function(code, lang){
    var o;

    if(lang == 'js') {
        lang = 'javascript';
    } else if (lang == 'html') {
        lang = 'xml';
    }
    if(lang){
        o = hljs.highlight(lang, code);
    } else {
        o = hljs.highlightAuto(code).value;
    }

    if(o){
        if (o.value) {
            return o.value;
        } else {
            return o;
        }
    } else {
        return code;
    }
};
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

module.exports = function (app) {
    app.get('/', function(req, res) {
        Blog.count({}, function (err, total) {
            Blog.find({ifpublic : true}).sort({'date':-1}).limit(3).exec(function (err, blogs) {
                for (var index in blogs) {
                    var date = blogs[index].date;
                    blogs[index].day = (date.getMonth() + 1) + "-" + date.getDate();
                    blogs[index].year = date.getFullYear();
                }
                res.render('home', {
                    title: '严伟庆博客 - 寿百年',
                    file: {
                        name: '最近更新',
                        title: '勿忘初衷',
                        content: [
                            '既往不恋',
                            '纵情向前',
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
            action: '/blog/',
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
            action: '/tags/' + req.params.tag,
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
                    action: '/topics/' + req.params.topic,
                    ifpublic: true,
                    data: {
                        title: topic.name + ' - 寿百年',
                        file: topic,
                        kind: '分类列表'
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
                et = new Date(year, month-1, day),
                action = '/archives/' + year + '/' + month + '/' + day,
                kind = '日期存档',
                title = year + '-' + month + '-' + day;
            et.setDate(et.getDate() + 1);
        } else {
            var st = new Date(year, month-1, 1),
                action = '/archives/' + year + '/' + month,
                kind = '月份寸档',
                title = year + '-' + month;
            if (month == 11) {
                var et = new Date(year+1, 0, 1);
            } else {
                var et = new Date(year, month, 1);
            }
        }
        var params = {
            page: req.query.page ? parseInt(req.query.page) : 1,
            action: action,
            ifpublic: true,
            time: {
                st: st,
                et: et
            },
            data: {
                title: '文章存档:' + title + ' - 寿百年',
                file: {
                    name: title,
                    title: '时间测试',
                    content: [
                        '你好吗1',
                        '你妹1',
                        '2你'
                    ]
                },
                kind: kind
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

            var content = blog.content.replace(/\\n/g, '\n');
            blog.content = marked(content);

            res.render('front/paper', {
                layout: 'boot',
                title: blog.title + ' - 寿百年',
                post: blog
            });
        });
    });

    // 前台标签页面
    app.get('/tags', function (req, res) {
        Tag.find({}).exec(function (err, tags) {
            res.render('front/tag', {
                title: '标签列表' + ' - 寿百年',
                file: {
                    name: '标签列表',
                    title: '标签标签标签',
                    content: [
                        '测试测试测试1o',
                        '测试测试测试2',
                        '测试测试测试3',
                    ]
                },
                tags: tags
            });
        });
    });

    // 前台分类页面
    app.get('/topics', function (req, res) {
        Topic.find({}).exec(function (err, topics) {
            res.render('front/topic', {
                title: '分类列表' + ' - 寿百年',
                file: {
                    name: '分类列表',
                    title: '分类分类分类',
                    content: [
                        '测试测试测试1o',
                        '测试测试测试2',
                        '测试测试测试3',
                    ]
                },
                topics: topics
            });
        });
    });

    // 前台历史
    app.get('/archives/:year?', function (req, res) {
        var year = req.params.year;
        if (year) {
            Blog.find({date: {$gte: new Date(year, 0, 1), $lt: new Date(year+1, 0, 1)}}).sort({'date':-1}).exec(function (err, blogs) {
                var month=[
                    {
                        year: year,
                        name: "January"
                    },
                    {
                        year: year,
                        name: "February"
                    },
                    {
                        year: year,
                        name: "March"
                    },
                    {
                        year: year,
                        name: "April"
                    },
                    {
                        year: year,
                        name: "May"
                    },
                    {
                        year: year,
                        name: "June"
                    },
                    {
                        year: year,
                        name: "July"
                    },
                    {
                        year: year,
                        name: "August"
                    },
                    {
                        year: year,
                        name: "September"
                    },
                    {
                        year: year,
                        name: "October"
                    },
                    {
                        year: year,
                        name: "November"
                    },
                    {
                        year: year,
                        name: "December"
                    }
                ];
                for (var i = 0; i < blogs.length; i ++) {
                    var j = blogs[i].date.getMonth();
                    if (!month[j].posts) {
                        month[j].posts = [];
                    }

                    blogs[i].day = blogs[i].date.getDate();
                    month[j].posts.push(blogs[i]);
                }
                for (var i = 0; i < 12; i ++) {
                    month[i].amount = month[i].posts ? month[i].posts.length : 0;
                    month[i].alias = i + 1;
                }
                res.render('front/archives', {
                    title: '文章存档:' + year + ' - 寿百年',
                    file: {
                        name: '文章存档:' + year,
                        title: '碎碎碎碎念',
                        content: [
                            '你好吗',
                            '你好吗',
                            '你好吗'
                        ]
                    },
                    month: month.reverse()
                });
            });



        } else {
            res.render('pages/archives', {
                title: '文章存档' + ' - 寿百年',
                file: {
                    name: '文章存档',
                    title: '碎碎碎碎碎念',
                    content: [
                        '123',
                        '234',
                        '456'
                    ]
                }
            });
        }

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
                    var notFirstPage = (pageNum > 1),
                        notLastPage = (pageNum < number),
                        relatePage = {};
                    relatePage.action = params.action;
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
