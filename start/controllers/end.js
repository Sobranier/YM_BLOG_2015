var mongoose = require('mongoose');

/* GET home page. */
module.exports = function (app) {

    //app.get('/end', checkLogin);
    app.get('/end', function(req, res) {
      res.render('dashboard', {
          layout: 'end',
          title:'BACK DASHBOARD'
      });
    });

    function checkLogin (req, res, next) {
        if (!req.session.user) {
            console.log('未登陆');
            res.redirect('/login');
        }
        next();
    }
};
