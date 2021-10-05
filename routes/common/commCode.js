var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');

router.post('/api/getCommCode/:codeNo', function(req, res, next) {
  let M_CODE = req.params.codeNo;
  console.log ("getCommCode/:codeNo.js >>>>>1 " + M_CODE)
  conn.executeQueryTx("SELECT CM.IO_CODE_NM, CD.IO_CODE_D, CD.IO_CODE_D_NM FROM C_CODE_D CD, C_CODE_M CM WHERE CD.IO_CODE_M = CM.IO_CODE_M AND CM.IO_CODE_M = ? AND CD.USE_YN='Y' ORDER BY CD.IO_CODE_SEQ ASC ", M_CODE, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/getCommCodeName/:codeNo', function(req, res, next) {
  let M_CODE = req.params.codeNo;
  console.log ("getCommCodeName/:codeNo.js >>>>>1 " + M_CODE)
  conn.executeQueryTx("SELECT CM.IO_CODE_NM  FROM C_CODE_D CD, C_CODE_M CM WHERE CD.IO_CODE_M = CM.IO_CODE_M AND CM.IO_CODE_M = ? AND CD.USE_YN='Y' ORDER BY CD.IO_CODE_SEQ ASC ", M_CODE, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/getSeqId/:seqName', function(req, res, next) {
  let SEQ_NAME = req.params.seqName;
  console.log ("getCommCodeName/:getSeqId.js >>>>>1 " + SEQ_NAME)
  conn.executeQueryTx("SELECT ID AS SEQ_ID FROM MASTER_SEQ WHERE SEQ_NAME =  ? ", SEQ_NAME, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});
module.exports = router;
