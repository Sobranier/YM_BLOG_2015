module.exports = function (app) {
    app.use(function(req, res, next) {
        res.status(404);

        res.render('404', {
            layout: 'boot',
            title:'404'
        });
    });
};
