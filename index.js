var express = require('express');
var router = express.Router();
var conn = require('./routes/util/dbConn');
var conf = require('./routes/util/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  conn.executeQuery('SELECT * FROM TEST', function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.render('index', { title: 'Express' });
  });
});


module.exports = router;