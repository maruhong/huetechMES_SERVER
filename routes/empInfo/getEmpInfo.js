var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');

/*
if (!module.parent) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Express server listening on port " + port + ".");
   });
}
*/
router.post('/api/getEmpInfoByEmpNo/:empNo', function(req, res, next) {
  let user = req.params.empNo;
  console.log ("getEmpInfo.js >>>>>1 " + user)
  conn.executeQueryTx("SELECT * FROM IO_EMP WHERE EMP_NO = ?", user, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/getEmpInfo', function(req, res, next) {
  console.log ("getEmpInfo.js::: /api/getEmpInfo >>>>>1 ")
  conn.executeQuery("SELECT * FROM  IO_EMP", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});
/*

router.get('/', function(req, res, next) {
  conn.executeQuery('SELECT * FROM TEST', function(result){
    console.log("*********************");
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
  });
});



router.get('/getEmpInfoAll', function(req, res, next) {
  conn.executeQuery('SELECT * FROM IO_EMP', function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
    res.send(JSON.stringify(result));
  });
});

router.get('/getEmpInfoByEmpNo/:empNo', function(req, res, next) {
  let empNo = req.params.empNo;
  conn.executeQuery('SELECT * FROM IO_EMP WHERE EMP_NO = ?', [empNo], function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
    res.send(JSON.stringify(result));
  });
});


router.put('/putEmpInfoByEmpNo/:empNo', function(req, res, next) {
  let empNo = req.params.empNo;
  let NAME = req.body.NAME,
      EMP_GBN = req.body.EMP_GBN,
      EMAIL_ADDR = req.body.EMAIL_ADDR,
      PHONE_NO = req.body.PHONE_NO;

  conn.executeQuery('INSERT INTO IO_EMP(EMP_NO, NAME, EMP_GBN, EMAIL_ADDR, PHONE_NO )  VALUES (?,?,?,?,?) ', [empNo,NAME, EMP_GBN, EMAIL_ADDR, PHONE_NO], function(result){
    if(err) throw err;
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
    res.send(JSON.stringify(res[0]));
  });
});

router.post('/postEmpInfoByEmpNo/:empNo', function(req, res, next) {
  let empNo = req.params.empNo;
  let NAME = req.body.NAME,
      EMP_GBN = req.body.EMP_GBN,
      EMAIL_ADDR = req.body.EMAIL_ADDR,
      PHONE_NO = req.body.PHONE_NO;
  conn.executeQuery('UPDATE IO_EMP SET NAME = ?, EMP_GBN =? , EMAIL_ADDR = ?, PHONE_NO =?  ) WHERE EMP_NO = ? ', [NAME, EMP_GBN, EMAIL_ADDR, PHONE_NO, empNo], function(result){
    if(err) throw err;
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
    res.send(JSON.stringify(res[0]));
  });
});


router.delete('/deleteEmpInfoByEmpNo/:empNo', function(req, res, next) {
  let empNo = req.params.empNo;
  conn.executeQuery('DELETE FROM IO_EMP WHERE EMP_NO = ? ', [empNo], function(result){
    if(err) throw err;
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
    res.send(JSON.stringify(res[0]));
  });
});

*/
/*
var type = 'C';
var tb_code = 'TB001';
var field = 'IO_NO,NAME,GENDER,JC_CD,JUMIN_NO';
var value = "'H001','김상화','F','AA',''";
var condition = '';
*/

//호출 방법1
//var queryStr = common_query.fn_makeCommonQuery(type,tb_code,field,value,condition);
/* 기석 과장 소스 
//호출 방법3
 var queryStr = common_query.fn_makeCommonQuery_callSP("procedure_test","'123','ABC'");

router.get('/', function(req, res, next) {

  //호출 방법2
  //var queryStr = common_query.fn_makeCommonQuery_req(req);
  
  conn.executeQuery(queryStr, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express1' });
  });
  
});
*/
module.exports = router;
