var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');


router.get('/api/getPartInfoSearch', function(req, res, next) {
  console.log ("getPartInfoSearch.js /api/getPartInfoSearch >>>>>1 ")
  conn.executeQuery("SELECT NO, PART_CD, PART_NM , SERIAL_NO, MODEL_NO,\
                    PART_SPEC, UNIT, MGR_EMP_NO, PURCHASE_NO, ATTRIBUTE, \
                    CRT_BY, CRT_DTM, MOD_BY, MOD_DTM \
                    FROM MES.PART_MASTER", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
