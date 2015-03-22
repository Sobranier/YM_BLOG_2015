#!/usr/bin/env node
var express = require('express'),
    debug = require('debug')('start'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    session = require('express-session');

var app = express();
mongoose.connect('mongodb://localhost/test');

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: [
        'views/partials/'
    ]
}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());

app.use(session({
    key: 'session',
    secret: 'SUPER SECRET',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));

fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) === '.js') {
        route = require('./controllers/' + file);
        route(app);
    }
});

app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});
