var Test = require('../models/test'),
    mongoose = require('mongoose');

Test = mongoose.model('Test');


module.exports = function (app) {
    
    app.get('/paper', function (req, res) {
      res.render('front/paper', { title: 'YANWEIQING' });
    });
    app.get('/test', function (req, res) {

        // 这里其实是创建了一个Entity,此newTest即为Entity
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

    app.get('/about', function (req, res) {
        res.render('pages/about', {
            title: '关于严伟庆',
            file: {
                title: '关于我',
                content: [
                    '测试测试测试1o',
                    '测试测试测试2',
                    '测试测试测试3'
                ]
            }
        });
    });

    app.get('/contact', function (req, res) {
        res.render('pages/contact', {
            title: '给我留言',
            file: {
                title: '留言我',
                content: [
                    '测试测试测试1o',
                    '测试测试测试2',
                    '测试测试测试3',
                ]
            }
        });
    });

    app.get('/links', function (req, res) {
        res.render('pages/links', {
            title: '友情链接',
            file: {
                title: '留言我',
                content: [
                    '测试测试测试1o',
                    '测试测试测试2',
                    '测试测试测试3',
                ]
            }
        });
    });

    app.get('/404', function (req, res) {
      res.render('404', {
          layout: 'boot',
          title:'404'
      });
    });

};

