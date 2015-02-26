
/* GET users listing. */
module.exports = function (app) {
    app.get('/login', function(req, res) {
        res.render('login', {
            layout: 'boot',
            title: '登陆'
        });
    });
};
