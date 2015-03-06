var User = require('../models/user'),
    mongoose = require('mongoose');

User = mongoose.model('User');

module.exports = function (app) {

    app.get('/logout', function (req, res) {
        req.session.user = null;
        res.redirect('/');
    });

    app.get('/login', checkNotLogin);
    app.get('/login', function (req, res) {
        /* 事先做好准备，存入一组数据
        var newUser = new User({
            account: 'test',
            password: '123'
        });
        newUser.save();
        */
        console.log('进入到login');
        // 以下tt数据只是测试环境展示用
        var tt = [];
        User.find({}).exec(function (err, user) {
            tt.push(user);
        });

        loginname = req.query.bname ? req.query.bname : '虾米儿';

        res.render('login', {
            layout: 'boot',
            title: '登陆',
            loginname: loginname,
            test: tt
        });
    });

    app.post('/login',checkNotLogin);
    app.post('/login', function (req, res) {
        console.log(req.session.user);
        var account = req.body.account,
            psw = req.body.password,
            bname = req.query.bname,
            isUser = false;
        User.find({}).exec(function(err, users) {
            for (var i = 0, len = users.length; i < len; i ++) {
                if (account === users[i].account && psw === users[i].password) {
                    isUser = true;
                    break;
                }
            }
            if (isUser) {
                req.session.user = account;

                res.redirect('/end');
            
            } else {
                res.redirect('/login');
            }
        });
    });

    /*
     *  注意这里需要写两个check
     * */

    function checkNotLogin (req, res, next) {
        console.log("检验是否不在线——" + req.session.user);
        if (req.session.user) {
            console.log('检测到登陆————在线账号:' + req.session.user);
            // 这里的导向待定 
            res.redirect('/end');
        } else {
            next();
        }
    }

};
