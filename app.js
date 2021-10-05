var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');
var cors = require('cors');
var dateFormat = require('dateformat');
var config = require('./routes/util/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var admKeyRouter = require('./routes/admKey');
var loginRouter = require('./routes/loginInfo/login');
var commRouter = require('./routes/common/commCode');
var getProjectRouter = require('./routes/projectInfo/getProjectInfo');
var putProjectRouter = require('./routes/projectInfo/putProjectInfo');
var vendorRouter = require('./routes/vendor/index');
var purchaseRouter = require('./routes/purchaseInfo/getPurchaseInfo'); //kks 20191109
//발주처-고객 관리
var customerRouter = require('./routes/customerInfo/getCustomerInfo');
var getProcessRouter = require('./routes/processCodeInfo/getProcessCode'); //hsk
var putProcessRouter = require('./routes/processCodeInfo/putProcessCode'); //hsk

//재료 Material Info
var getMaterialRouter = require('./routes/materialInfo/getMaterialInfo'); //hsk

//재료 Material Info
var getWorkRouter = require('./routes/workInfo/getWorkInfo'); //hsk
 
//부품명 Info
var getPartRouter = require('./routes/partInfo/getPartInfo'); //hsk

//장비명 Info
var getEquipmentRouter = require('./routes/equipmentInfo/getEquipmentInfo'); //hsk

//CAM 담당자 Info
var getCamRouter = require('./routes/camInfo/getCamInfo'); //hsk

//CAD 담당자 Info
var getCadRouter = require('./routes/cadInfo/getCadInfo'); //hsk

//프로젝트별 작업 일정 기간
var pjtStatRouter = require('./routes/dayStatis/getPjtStatInfo'); //hsk

// 사원정보 관리
var rEmpInfo = require('./routes/empInfo/getEmpInfo'); //./routes/customerInfo/index.js
var cEmpInfo = require('./routes/empInfo/setEmpInfo'); //./routes/customerInfo/users.js
var uEmpInfo = require('./routes/empInfo/updEmpInfo'); //./routes/customerInfo/users.js
var dEmpInfo = require('./routes/empInfo/delEmpInfo'); //./routes/customerInfo/users.js

// 공통 쿼리
var callDirectQuery = require('./routes/common/callDirectQuery'); //./routes/common/callDirectQuery.js

const passport    = require('passport');
//require('./passport');
require('./passport');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

app.use(cors()); // Access-Control-Allow-Origin 헤더를 설정해줄 수 있는 cors npm 모듈
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(dateFormat);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', passport.authenticate('jwt', {session: false}), loginRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/admKey', admKeyRouter);
app.use('/', rEmpInfo);
app.use('/', commRouter);
// app.use('/api/empInfo/setEmpInfo', cEmpInfo); 
// app.use('/api/empInfo/updEmpInfo', uEmpInfo);
// app.use('/api/empInfo/delEmpInfo', dEmpInfo);
app.use('/', getProjectRouter);
app.use('/', putProjectRouter);
app.use('/', customerRouter);
app.use('/', purchaseRouter);
app.use('/', getProcessRouter);
app.use('/', putProcessRouter);
app.use('/', loginRouter);
app.use('/api/vendor', vendorRouter);
app.use('/', pjtStatRouter);
app.use('/', getMaterialRouter);
app.use('/', getWorkRouter);
app.use('/', getPartRouter);
app.use('/', getEquipmentRouter);
app.use('/', getCamRouter);
app.use('/', getCadRouter);

app.use('/api/common/callDirectQuery', callDirectQuery);
//http:localhost:3000/api
//http:localhost:3000/api/users


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
console.log('app.js payload received');
if (!module.parent) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Express server listening on port " + port + ".");
  });
}
module.exports =  app;