var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');

router.get('/api/getPjtStatInfo', function(req, res, next) {
  console.log ("getPjtStatInfo.js /api/getPjtStatInfo >>>>>1 ")
  conn.executeQuery("SELECT * \
          FROM PROJECT_PLAN_DESC", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;