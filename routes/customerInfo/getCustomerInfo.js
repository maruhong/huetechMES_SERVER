var express = require('express');
var router = express.Router();
var conn = require('../util/dbConn.js');
var conf = require('../util/config');

/* 고객정보 모두 가져오기 */
router.get('/api/get_customer_desc_all', function(req, res, next) {
  conn.executeQuery('SELECT * FROM customer_desc', function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
  });
});
/* 고객의 고유코드 가져오기 */
router.get('/api/get_customer_masterCode', function(req, res, next) {
  conn.executeQuery("SELECT CONCAT(substr(replace(CUSTOMER_NM,\' \',\'\'),1,3), LEGAL_NO) as customerCode  FROM mes.customer_master", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

  /* 고객의 회사명 가져오기 */
router.get('/api/get_customer_masterName', function(req, res, next) {
  conn.executeQuery("SELECT CUSTOMER_NM as customerName  FROM mes.customer_master", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});
/* 공통 코드  상세 정보 가져오기 */
router.post('/api/getCommCode/:codeNo', function(req, res, next) {
  let M_CODE = req.params.codeNo;
  console.log ("getCommCode/:codeNo.js >>>>>1 " + M_CODE)
  conn.executeQueryTx("SELECT CM.IO_CODE_NM, CD.IO_CODE_D, CD.IO_CODE_D_NM FROM C_CODE_D CD, C_CODE_M CM WHERE CD.IO_CODE_M = CM.IO_CODE_M AND CM.IO_CODE_M = ? AND CD.USE_YN='Y' ORDER BY CD.IO_CODE_SEQ ASC ", M_CODE, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});
/* 코드값에 의한 코드명  가져오기 */
router.post('/api/getCommCodeName/:codeNo', function(req, res, next) {
  let M_CODE = req.params.codeNo;
  console.log ("getCommCodeName/:codeNo.js >>>>>1 " + M_CODE)
  conn.executeQueryTx("SELECT CM.IO_CODE_NM  FROM C_CODE_D CD, C_CODE_M CM WHERE CD.IO_CODE_M = CM.IO_CODE_M AND CM.IO_CODE_M = ? AND CD.USE_YN='Y' ORDER BY CD.IO_CODE_SEQ ASC ", M_CODE, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;