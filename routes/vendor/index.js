var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');

function defualtCallbackFunction(result){
  if(result){
    res.send(JSON.stringify(result));
  }else{
    res.send("FAIL");
  }
}

router.get('/getVendorInfo', function(req, res, next) {
  console.log(req);
  conn.executeQuery("SELECT * FROM VENDOR_MASTER WHERE VENDOR_CD = 1"  , function(result){
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

router.get('/getVendorList', function(req, res, next){
  console.log("getVendorList *********************");
  conn.executeQuery("SELECT VENDOR_NM AS Name, BOSS_NM AS Boss, MAIN_ADDR AS Addr, TEL_NO AS Tel, MGR_HP_NO AS Mgr  FROM VENDOR_MASTER", function(result){
    console.log("########## vendor list");
    res.send(JSON.stringify(result));
  });
});

router.post('/insertVendor', function(req, res, next){
  var sql = "";
  console.log("vendor insert");
  // conn.executeQuery(sql, function(result){
  //   res.send(JSON.stringify(result));
  // });
});

router.put('/putVendorInfo', function(req, res, next){
  console.log("**** in putVendorInfo");
  console.log("**** req : " + req);
  var query = "INSERT INTO VENDOR_MASTER (VENDOR_CD, VENDOR_NM, LEGAL_NO, BOSS_NM, ATTRIBUTE, MAIN_ADDR, SUB_ADDR, "
    + "TEL_NO, FAX_NO, EMAIL_ADDR, MGR_HP_NO, MGR_TEL_NO, MGR_EMAIL_ADDR, VENDOR_GBN, USE_YN, CRT_BY, CRT_DTM) "
    + "VALUES "
    + "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  // conn.executeQuery(queyr, param, function(result){
        // res.send("success");
  // };

  res.send("OK");
});

router.get('/updateVendorInfo', function(req, res, next){

});


module.exports = router;