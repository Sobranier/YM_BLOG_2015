#!/usr/bin/env node
var express = require('express'),
    debug = require('debug')('start'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    fs = require('fs');

var app = express();

// view engine setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: [
        'views/partials/'
    ]
}));
app.set('view engine', 'handlebars');
//app.use(favicon(__dirname + '/assets/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

// 路由
fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) === '.js') {
        route = require('./controllers/' + file);
        route(app);
    }
});

var settings = require('./models/settings');
var flash = require('connect-flash');
app.use(flash());

var session = require('express-session');
/*
var MongoStore = require('connect-mongo')(session);

app.use(session({
      secret: settings.cookieSecret,
      key: settings.db,//cookie name
      cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
      store: new MongoStore({
              db: settings.db,
          host: settings.host,
          port: settings.port
            })
}));

*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Server listening on port ' + server.address().port);
});
