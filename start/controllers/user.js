var User = require('../models/user'),
    mongoose = require('mongoose');

User = mongoose.model('User');

/* GET users listing. */
module.exports = function (app) {
    app.get('/login', function(req, res) {
        /* 实现做好准备，存入一组数据
        var newUser = new User({
            account: 'test',
            password: '123'
        });
        newUser.save();
        */
        var tt = [];
        User.find({}).exec(function (err, user) {
            tt.push(user);
        });
        loginname = req.query.bname ? req.query.bname : '虾米';

        res.render('login', {
            layout: 'boot',
            title: '登陆',
            loginname: loginname,
            test: tt
        });
    });
};
