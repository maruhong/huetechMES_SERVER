var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');


router.get('/api/getCadInfoSearch', function(req, res, next) {
  console.log ("getCadInfoSearch.js /api/getCadInfoSearch >>>>>1 ")
  conn.executeQuery("SELECT IO_CODE_SEQ AS NO, IO_CODE_D AS CAD_MGR_CD, IO_CODE_D_NM AS CAD_MGR_NM, \
                    IO_ATTRIBUTE \
                    FROM MES.C_CODE_D WHERE IO_CODE_M = 'B002' AND USE_YN = 'Y' ", function(result){
  console.log("In Index : " + JSON.stringify(result));
  res.send(JSON.stringify(result));
  });
});

module.exports = router;
