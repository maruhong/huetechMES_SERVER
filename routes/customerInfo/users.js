var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/get_customer_desc_all', function(req, res, next) {
  res.send('respond with a resource!!!');
});

module.exports = router;
