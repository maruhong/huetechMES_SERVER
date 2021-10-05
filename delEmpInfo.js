var express = require('express');
var router = express.Router();
var conn = require('../util/dbConn.js');
var conf = require('../util/config');

/* GET home page. */
router.get('/empInfo', function(req, res, next) {
  conn.executeQuery('SELECT * FROM TEST', function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
  });
});


module.exports = router;