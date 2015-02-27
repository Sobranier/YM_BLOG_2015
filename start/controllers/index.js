var Test = require('../models/test'),
    mongoose = require('mongoose');

Test = mongoose.model('Test');


/* GET home page. */
module.exports = function (app) {
    

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




    app.get('/post', function(req, res) {
        res.render('post', {
            layout: 'boot',
            title: '发表'
        });
    });
    app.post('/post', function(req, res) {
    });

};

