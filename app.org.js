var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var admKeyRouter = require('./routes/admKey');
var customerInfoIndexRouter = require('./routes/customerInfo/index'); //./routes/customerInfo/index.js
var customerInfoUsersRouter = require('./routes/customerInfo/users'); //./routes/customerInfo/users.js

// 사원정보 관리
var rEmpInfo = require('./routes/empInfo/getEmpInfo'); //./routes/customerInfo/index.js
var cEmpInfo = require('./routes/empInfo/setEmpInfo'); //./routes/customerInfo/users.js
var uEmpInfo = require('./routes/empInfo/updEmpInfo'); //./routes/customerInfo/users.js
var dEmpInfo = require('./routes/empInfo/delEmpInfo'); //./routes/customerInfo/users.js

// 공통 쿼리
var callDirectQuery = require('./routes/common/callDirectQuery'); //./routes/common/callDirectQuery.js


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/admKey', admKeyRouter); 
app.use('/api/empInfo/getEmpInfo', rEmpInfo);
app.use('/api/empInfo/setEmpInfo', cEmpInfo); 
app.use('/api/empInfo/updEmpInfo', uEmpInfo);
app.use('/api/empInfo/delEmpInfo', dEmpInfo); 

app.use('/api/common/callDirectQuery', callDirectQuery);
//http:localhost:3000/api
//http:localhost:3000/api/users

app.head("/api", cors(), (req, res) => {
  console.info("HEAD /api");
  res.sendStatus(204);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
