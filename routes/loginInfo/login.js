var express = require('express');
var router = express.Router();
var conn = require('../util/dbConn');
var config = require('../util/config');
var jwt = require('jsonwebtoken');


const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secret;
jwtOptions.expiresIn = 60 * 30; // 30 min

console.log('333 payload received');

// lets create our strategy for web token
// let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log('payload received', jwt_payload);
//   let user = getUser({ id: jwt_payload.id });
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
//   passport.use(strategy);
//   return {
//     initialize: function () {
//       return passport.initialize();
//     },
//     authenticate: function () {
//       return passport.authenticate('jwt', config.jwtSession);
//     }
//   };
// });

/* GET Login page. */
router.post('/api/loginInfo', function(req, res, next) {
  console.log ("loginInfo.js >>>>>0 ")
  let user = req.body.empNo;
  let pword = req.body.password;
 
  console.log ("loginInfo.js >>>>>1 " + user + ":" + pword)
  conn.executeQueryTx("SELECT count(*) as cnt , name FROM IO_EMP WHERE EMP_NO = ? AND PASSWORD = ?",[user,pword], 
    function(result){
      console.log("In Index111 : " + JSON.stringify(result));
      console.log("In Index222 : " +  JSON.parse(JSON.stringify(result))[0].cnt);
      let resultCnt =  JSON.parse(JSON.stringify(result))[0].cnt;
     // console.log("In Index333 : " + JSON.parse(JSON.stringify(result))[0].cnt);
      if(resultCnt > 0) { //정상 처리 되었을때 
     // if(result.status === 200) { //정상 처리 되었을때 
     // console.log("In Index222 : {  cnt: result.cnt  } : "  +  JSON.parse(JSON.stringify(result))[0].cnt );
     // console.log("In Index333 : {  name: result.name } : "  +   JSON.parse(JSON.stringify(result))[0].name);
      let resultName = JSON.parse(JSON.stringify(result))[0].name;
      let payload = { id: user , name: resultName };
      let token = jwt.sign(payload, jwtOptions.secretOrKey , { expiresIn : 60 * 30 });
      res.send({ user: payload, token: token });
    } else {
        throw new Error('login failed')
    }
    }
  );
});

router.post('/api/loginInfo/22', function(request, response, next) { 
  var token = request.headers.accesstoken;
    if(typeof token !== 'undefined'){
      console.log ("loginInfo/22 >>>>> 3 " + config.secret)
      console.log ("loginInfo/22 >>>>> 4 " + request.headers.accesstoken)
        var decoded = jwt.verify(token, jwtOptions.secretOrKey);
        console.log ("loginInfo/22 >>>>> 5 " + decoded.id)
        response.send({
           "data" : {
             "id"   : decoded.id,
             "name" : decoded.name
             }
        }); 
        console.log ("loginInfo/22 >>>>> 6 " + decoded.name) 
    }else{
        response.sendStatus(403);
    }
  // let accessToken = JSON.parse(JSON.stringify(req.headers)).access-token;
    // if(JSON.parse(JSON.stringify(req.headers)).access-token != null) {
    //   res.send({
    //     "data" : {
    //       "token" : accessToken
    //       }
    //     });
    //   } else {
    //     throw new Error('login failed')
    //   }
  });

module.exports = router;