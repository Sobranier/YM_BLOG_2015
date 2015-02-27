var mongoose = require('mongoose');

/* GET home page. */
module.exports = function (app) {

    app.get('/end', checkLogin);
    app.get('/end', function(req, res) {
      res.render('dashboard', {
          layout: 'end',
          title:'BACK DASHBOARD'
      });
    });

    function checkLogin (req, res, next) {
        console.log("检验是否在线——" + req.session.user);
        if (!req.session.user) {
            console.log('未检测到在线');
            res.redirect('/login');
        }
        next();
    }
};
