var Blog = require('../models/blog'),
    mongoose = require('mongoose');

Blog = mongoose.model('Blog');

module.exports = function (app) {
    app.get('/', function(req, res) {
        /*
        var newBlog = new Blog({
            title: '前端实践',
            date: new Date(),
            content: '本文记录了美团在推广webp的一方面实践，虽然本人负责主要的实施，但领导及同事们提供了很大的帮助，包括方案的讨论及选定和后期文章的审阅等等。本文除了大记录了如何实施，还分享了整个效果评估的方案，总的来说是对新技术的一些尝试。更多内容可以去http://fe.meituan.com观看。',
            summary: '这是测试的贱贱贱加加加加123',
            alias: 'test2',
            topics: [
                {
                    name: 'JavaScript'
                }
            ],
            tags: [
                {
                    name: 'Html'
                },
                {
                    name: 'JavaScript'
                },
                {
                    name: 'Node'
                }
            ],
            ifpublic: true
        });
        newBlog.save();
        */

        Blog.find({}).exec(function (err, blogs) {
            for (var index in blogs) {
                var date = blogs[index].date;
                blogs[index].day = (date.getMonth() + 1) + "-" + date.getDate();
                blogs[index].year = date.getFullYear();
            }
            res.render('home', {
                title: 'YANWEIQING',
                file: {
                    name: '最近更新',
                    content: [
                        {
                            p: '测试测试测试测试测试'
                        },
                        {
                            p: '测试测试测试测试测试'
                        },
                        {
                            p: '测试测试测试测试测试'
                        }
                    ]
                },
                posts: blogs
            });
        });

    });

    app.post('/posts/search', function (req, res) {
        console.log(req.body);
        console.log(req.body.title);

        Blog.find({}).exec(function (err, blogs) {
            for (var index in blogs) {
                var date = blogs[index].date;
                blogs[index].day = (date.getMonth() + 1) + "-" + date.getDate();
                blogs[index].year = date.getFullYear();
            }

            res.json({posts: blogs});
        });
    });

    app.get('/tags/:tag', function (req, res) {
        console.log(req.params.tag);
        res.render('paper', {title: 'tag'}); 
    });







}
