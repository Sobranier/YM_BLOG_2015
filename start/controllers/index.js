var Test = require('../models/test'),
    mongoose = require('mongoose');

Test = mongoose.model('Test');



/* GET home page. */
module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('home', {
            title: 'YANWEIQING',
            file: {
                name: '生活点滴',
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
            posts: [
                {
                    _id: 1,
                    title: '前端实践',
                    date: '2015-02-15',
                    content: '本文记录了美团在推广webp的一方面实践，虽然本人负责主要的实施，但领导及同事们提供了很大的帮助，包括方案的讨论及选定和后期文章的审阅等等。本文除了大记录了如何实施，还分享了整个效果评估的方案，总的来说是对新技术的一些尝试。更多内容可以去http://fe.meituan.com观看。',
                    files: [
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
                    ]
                },
                {
                    _id: 2,
                    title: '前端实践',
                    date: '2015-02-15',
                    content: '本文记录了美团在推广webp的一方面实践，虽然本人负责主要的实施，但领导及同事们提供了很大的帮助，包括方案的讨论及选定和后期文章的审阅等等。本文除了大记录了如何实施，还分享了整个效果评估的方案，总的来说是对新技术的一些尝试。更多内容可以去http://fe.meituan.com观看。',
                    files: [
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
                    ]
                },
                {
                    _id: 3,
                    title: '前端实践',
                    date: '2015-02-15',
                    content: '本文记录了美团在推广webp的一方面实践，虽然本人负责主要的实施，但领导及同事们提供了很大的帮助，包括方案的讨论及选定和后期文章的审阅等等。本文除了大记录了如何实施，还分享了整个效果评估的方案，总的来说是对新技术的一些尝试。更多内容可以去http://fe.meituan.com观看。',
                    files: [
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
                    ]
                },
                {
                    _id: 4,
                    title: '前端实践',
                    date: '2015-02-15',
                    content: '本文记录了美团在推广webp的一方面实践，虽然本人负责主要的实施，但领导及同事们提供了很大的帮助，包括方案的讨论及选定和后期文章的审阅等等。本文除了大记录了如何实施，还分享了整个效果评估的方案，总的来说是对新技术的一些尝试。更多内容可以去http://fe.meituan.com观看。',
                    files: [
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
                    ]
                }
            
            
            ]
        });
    });
    app.get('/paper', function(req, res) {
      res.render('paper', { title: 'YANWEIQING' });
    });
    app.get('/test', function(req, res) {
        var newTest = new Test({
            name:'测试者2'
        });
        newTest.save();

        var tt = [];
        Test.find({}).exec(function (err, blogs) {
            tt.push(blogs);
        });
        console.log(tt);
        res.render('papertest', {
            title: 'mongo测试',
            test: tt
        });
    });



    app.get('/404', function(req, res) {
      res.render('404', {
          layout: 'boot',
          title:'404'
      });
    });


    /*dashboard*/
    app.get('/end', function(req, res) {
      res.render('dashboard', {
          layout: 'end',
          title:'BACK DASHBOARD'
      });
    });


    /**/
    app.get('/reg', function(req, res) {
        res.render('reg', {
            layout: 'boot',
            title: '注册'
        });
    });
    app.post('/reg', function(req, res) {
    });
    app.get('/post', function(req, res) {
        res.render('post', {
            layout: 'boot',
            title: '发表'
        });
    });
    app.post('/post', function(req, res) {
    });

    app.post('/login', function(req, res) {
    });
    app.post('/logout', function(req, res) {
    });
};

