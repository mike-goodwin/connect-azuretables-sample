var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var AzureTablesStoreFactory = require('connect-azuretables')(session);
var app = express();
app.set('view engine', 'jade');

//sessions
app.use(session({
    store: AzureTablesStoreFactory.create({ logger: console.log, errorLogger: console.log, sessionTimeOut: 15 }),
    secret: process.env.SESSION_SIGNING_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

passport.use(new LocalStrategy(function(username, password, done) {
    return done(null, { name: username });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var index = require('./routes/index');
app.use('/', index);

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.clearCookie('connect.sid');
    res.render('error', {});
});

module.exports = app;
