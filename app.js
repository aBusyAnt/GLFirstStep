var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var PostgreSqlStore = require('connect-pg-simple')(session);
var flash = require('connect-flash');
var config = require('config');
var moment = require('moment');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var verifycode = require('./routes/verifycode');
var book = require('./routes/book');
var datainit = require('./routes/datainit');
var adminlogin = require('./routes/admin_login');
var usercenter = require('./routes/user_center');
var article = require('./routes/article');
var course = require('./routes/course');
var search = require('./routes/search');
var redirect = require('./routes/redirect');

var app = express();

app.set(3000);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/courses'));
app.use(flash());

//session
var theconfig = {
  ssl: config.get('database.ssl'),
  type: config.get('database.type'),
  user: config.get('database.user'),
  password: config.get('database.password'),
  host: config.get('database.host'),
  database: config.get('database.database') 
}
var connectString = theconfig.type + '://' + theconfig.user + ':' + theconfig.password + '@' + theconfig.host + '/' + theconfig.database + '?ssl=' + theconfig.ssl; 
console.log('session store to :',connectString);
var sessionOptions = {
  secret : config.get('session_secret'),
  resave : false,
  saveUninitialized : false,
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 }, // 1 days
  store : new PostgreSqlStore({
    conString:connectString
  })
}
app.use(session(sessionOptions));

//DynamicHelper
app.use(function(req,res,next){
  res.locals.user = req.session.user;
  res.locals.port = req.session.post;

  var error = req.flash('error');
  res.locals.error = error.length ? error:null;

  var success = req.flash('success');
  res.locals.success = success.length ? success:null;

  res.locals.moment = moment;
  res.locals.shortDateFormat = "YYYY-MM-DD";

  next();
});


////
app.use('/', routes);
app.use('/book', book);
app.use('/verifycode',verifycode);
app.use('/users', users);
app.use('/usercenter',usercenter);
app.use('/article',article);
app.use('/course',course);
app.use('/search',search);
app.use('/redirect',redirect);
//////
app.use('/admin',admin);
app.use('/datainit',datainit);
app.use('/adminlogin',adminlogin);

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

module.exports = app;
