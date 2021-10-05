var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');


router.get('/api/getEquipmentInfoSearch', function(req, res, next) {
  console.log ("getEquipmentInfoSearch.js /api/getEquipmentInfoSearch >>>>>1 ")
  conn.executeQuery("SELECT NO, EQUIPMENT_CD, EQUIPMENT_NM, EQUIPMENT_SPEC, \
                    SERIAL_NO, MODEL_NO, ATTRIBUTE, UNIT, MGR_EMP_NO, \
                    PURCHASE_NO, SUB_EQUIPMENT1, SUB_EQUIPMENT_UNIT1, \
                    SUB_EQUIPMENT2, SUB_EQUIPMENT_UNIT2, SUB_EQUIPMENT3, \
                    SUB_EQUIPMENT_UNIT3, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM \
                    FROM MES.EQUIPMENT_LIST", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
