var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');


router.get('/api/getWorkInfoSearch', function(req, res, next) {
  console.log ("getWorkNmSearch.js /api/getWorkInfoSearch >>>>>1 ")
  conn.executeQuery("SELECT IO_CODE_SEQ AS NO, IO_CODE_D AS WORK_CD , IO_CODE_D_NM AS WORK_NM, \
                    IO_ATTRIBUTE \
                    FROM MES.C_CODE_D WHERE IO_CODE_M = 'P003' AND USE_YN = 'Y' ", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
