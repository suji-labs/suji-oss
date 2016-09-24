'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
// file upload

// routes v1.1
var menu = require('./api/v1.1/menu/index');
var category = require('./api/v1.1/category/index');
var purchase = require('./api/v1.1/purchase/index');
var user = require('./api/v1.1/user/index');

app.use('/api/v1.1/menu', menu);
app.use('/api/v1.1/category', category);
app.use('/api/v1.1/purchase', purchase);
app.use('/api/v1.1/user', user);

// routes v1.2
var employee = require('./api/v1.2/employee/index');
var stats = require('./api/v1.2/stats/index');

app.use('/api/v1.2/employee', employee);
app.use("/api/v1.2/stats", stats);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
