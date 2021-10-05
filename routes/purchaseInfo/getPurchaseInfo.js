var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');

/*
if (!module.parent) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Express server listening on port " + port + ".");
   });
}
*/
router.get('/api/getPurchaseInfo', function(req, res, next) {
  console.log ("getEmpInfo.js /api/purchase_master >>>>>1 ")
  conn.executeQuery("SELECT * FROM purchase_master", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});


module.exports = router;
