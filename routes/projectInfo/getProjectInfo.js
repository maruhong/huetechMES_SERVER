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
router.get('/api/getProjectInfo', function(req, res, next) {
  console.log ("getProjectInfo.js /api/getProjectInfo >>>>>1 ")
  conn.executeQuery("SELECT NO, PROJECT_CD, PROJECT_NM, MODEL_NM, ATTRIBUTE, \
                      SORT_ORDER, PROJECT_EMP_NO, PROJECT_CUSTOMER_ID, \
                      CAVITY, CAD AS CAD_MGR_NM, CAM AS CAM_MGR_NM, PROJECT_MATERIAL, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM, PROJECT_IMG \
                    FROM MES.PROJECT_MASTER ", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/getProjectInfo/:projectCd', function(req, res, next) {
  let projectCd = req.params.projectCd;
  //console.log ("getProjectInfo/:projectCd.js >>>>>1 " + projectCd)
  conn.executeQueryTx("SELECT A.*, B.* FROM PROJECT_MASTER A, PROJECT_DESC B WHERE A.PROJECT_CD = B.PROJECT_CD AND A.PROJECT_CD = ? ", projectCd, function(result){
    console.log("In Index projectInfo : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
