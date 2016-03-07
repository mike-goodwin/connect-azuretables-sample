var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var AzureTablesStore = require('connect-azuretables')(session);

var app = express();
app.set('view engine', 'jade');
//app.use(express.static(path.join(__dirname, 'public')));

//sessions
app.use(session({ 
    store: new AzureTablesStore(),
    secret: process.env.SESSION_SIGNING_KEY,
    resave: false,
    saveUninitialized: false
    }));
    
app.use(passport.initialize());

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var index = require('./routes/index');
app.use('/', index);

module.exports = app;
