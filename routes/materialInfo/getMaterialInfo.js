var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');


router.get('/api/getMaterialInfoSearch', function(req, res, next) {
  console.log ("getMaterialInfoSearch.js /api/getMaterialInfoSearch >>>>>1 ")
  conn.executeQuery("SELECT NO, MATERIAL_CD, MATERIAL_NM, SERIAL_NO, MODEL_NO, MATERIAL_SPEC, UNIT, MGR_EMP_NO,\
                    PURCHASE_NO, ATTRIBUTE, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM \
                    FROM MES.MATERIAL_MASTER", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
