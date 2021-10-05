var express = require('express');
var router = express.Router();
var conn = require('../util/dbConn.js');
var conf = require('../util/config');
var common_query = require('../common/common_query.js');


router.post('/', function(req, res, next) {

    var type = req.param('type');
    var tb_code = req.param('tb_code');
    var field = req.param('field');
    var value = req.param('value');
    var condition = req.param('condition');
  
    var queryStr = common_query.fn_makeCommonQuery(type,tb_code,field,value,condition);
    
    conn.executeQuery(queryStr, function(result){
      console.log("In Index1 : " + JSON.stringify(result));

      //res.render('index', { title: 'Express1' });
      res.send(JSON.stringify(result));

    /*
    res.send(body), res.send(status, body) : 클라이언트에 응답을 보냄. 상태 코드는 옵션. 기본 콘텐츠 타입은 text/html이므로 text/plain을 보내려면 res.set(‘Content-Type’, ‘text/plain’)을 먼저 호출 해야한다. JSON을 보낼거면 res.json을 쓰자.
    res.json(json), res.json(status, json) : 클라이언트로 JSON 값을 보냄.
    */
    });
    
});

module.exports = router;