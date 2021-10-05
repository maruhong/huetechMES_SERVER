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
router.get('/api/getProcessCodeAll', function(req, res, next) {
  console.log ("getProcessCode.js /api/PROJECT_Master >>>>>1 ")
  conn.executeQuery("SELECT IO_CODE_SEQ AS ID, IO_CODE_D_NM AS CODENAME FROM C_CODE_D where IO_CODE_M = 'P001' AND USE_YN ='Y'", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/getProcessCodeByProject/:projectCode', function(req, res, next) {
  let projectCode = req.params.projectCode
  console.log ("getProcessCode.js /api/PROCESS_Master >>>>>1 ")
  conn.executeQueryTx("SELECT IO_CODE_SEQ AS ID, IO_CODE_D_NM AS CODENAME FROM C_CDOE_D WHERE IO_CODE_CD IN (SELECT PROCESS_CD FROM PROCESS_MASTER where PROJECT_CD = ?)", [projectCode], function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.post('/api/getProcessCodeByDateInfo', function(req, res, next) {
  console.log ("getProcessCode.js /api/getProcessCodeByDateInfo >>>>> startDate ")
 // let startDate = req.param.getDateInfo.startDate;
 // let endDate = req.param.getDateInfo.endDate;
  var dateInfo = req.body;
  var searchStartDate = null
  var searchEndDate = null
 /* const event = new Date.now()
  
  if(dateInfo.startDate == null) {
    searchStartDate = event.toISOString()
    searchEndDate = event.toISOString()
  } else { */
    searchStartDate = dateInfo.startDate
    searchEndDate = dateInfo.endDate
 // }
  console.log ("getProcessCode.js /api/getProcessCodeByDateInfo startDate>>>>>1 " + searchStartDate)
  console.log ("getProcessCode.js /api/getProcessCodeByDateInfo endDate>>>>>1 " + searchEndDate)
  /// let startDate = getDateInfo.startDate;
///let endDate = getDateInfo.endDate;
//router.get('/api/getProcessCodeByDateInfo', function(req, res, next) {

//  conn.executeQueryTx("SELECT PROJECT_CD FROM PROJECT_MASTER WHERE DATE_FORMAT(CRT_DTM,'%Y-%m-%d') BETWEEN ? and ?", [dateInfo], function(result){
  conn.executeQueryTx("SELECT PROJECT_CD FROM PROJECT_MASTER WHERE DATE_FORMAT(CRT_DTM,'%Y-%m-%d') BETWEEN ? and ?", [searchStartDate,searchEndDate], function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/getProcessCodeByProjectId/:projectCode', function(req, res, next) {
  console.log ("getProcessCode.js /api/getProcessCodeByProjectId >>>>> projectId ")
 // var pBody = req.body;
 // var projectId = pBody.s_projectId;
 let projectCode = req.params.projectCode
  console.log ("getProcessCode.js /api/getProcessCodeByProjectId projectId>>>>>1 " + projectCode)
  conn.executeQueryTx("SELECT PROCESS_CD AS ID, PROCESS_NM AS CODENAME , true AS isCodeReg FROM PROCESS_PLAN_DESC WHERE PROJECT_CD = ?", [projectCode], function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.post('/api/getProcessRealInfoByProjectId', function(req, res, next) {
 console.log ("getProcessCode.js /api/getProcessRealInfoByProjectId >>>>> projectId ")
 var processInfo = req.body;
 console.log ("getProcessCode.js /api/getProcessRealInfoByProjectId projectId>>>>>1 " + processInfo.projectId)
 console.log ("getProcessCode.js /api/getProcessRealInfoByProjectId processCodeId>>>>>1 " + processInfo.processCodeId)
 console.log ("getProcessCode.js /api/getProcessRealInfoByProjectId processCodeName>>>>>1 " + processInfo.processCodeName)
 conn.executeQueryTx("SELECT PPD.NO, PPD.PROCESS_CD, PPD.PROCESS_NM, PPD.SEQ_PROCESS_NO, \
                        PPD.WORK_CD, FNC_GET_C_CODE_D_NM(SUBSTR(PM.WORK_CD,1,4),PM.WORK_CD) AS WORK_NM, PM.COMPRESS_RATE, \
                        PPD.PROJECT_CD, FNC_GET_PROJECT_NM(PPD.PROJECT_CD) AS PROJECT_NM, \
                        PM.EQUIPMENT_CD , FNC_GET_EQUIPMENT_NM(PM.EQUIPMENT_CD) AS EQUIPMENT_NM,  \
                        PM.MATERIAL_CD , FNC_GET_MATERIAL_NM(PM.MATERIAL_CD)AS MATERIAL_NM, PM.PART_CD,\
                        FNC_GET_PART_NM(PM.PART_CD) AS PART_NM, PM.CAVITY, FNC_GET_C_CODE_D_NM(SUBSTR(PM.CAVITY,1,4),PM.CAVITY) AS CAVITY_NM, \
                        PPD.PLAN_WORK_COUNT, PPD.PLAN_START_DT, PPD.PLAN_FINISH_DT, \
                        PPD.PLAN_USE_HOUR, PPD.PROCESS_UNIT, \
                        PPD.OTHER_PROCESS_HOUR, PPD.OTHER_PROCESS_MIN, \
                        PPD.SELF_PROCESS_HOUR, PPD.SELF_PROCESS_MIN, \
                        PPD.ATTRIBUTE, PPD.SORT_ORDER, PPD.PRICE_PER_HOUR, PPD.CRT_BY, \
                        PPD.CRT_DTM, PPD.MOD_BY, PPD.MOD_DTM \
                      FROM MES.PROCESS_PLAN_DESC PPD, MES.PROCESS_MASTER PM \
                      WHERE PPD.PROJECT_CD = PM.PROJECT_CD AND PPD.PROCESS_CD = PM.PROCESS_CD \
                      AND PPD.PROJECT_CD = ? AND PPD.PROCESS_CD = ? AND PPD.PROCESS_NM = ?", [processInfo.projectId,processInfo.processCodeId,processInfo.processCodeName], function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
