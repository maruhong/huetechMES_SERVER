var express = require('express');
var router = express.Router();

var conn = require('../util/dbConn.js');
var conf = require('../util/config');


router.post('/api/putProcessCodeByProjectId', function(req, res, next) {
    console.log ("putProcessCode.js /api/putProcessCodeByProjectId >>>>>1 >> ");
    //cry_by / crt_dtm 은 추가해야함. mod_by, mod_dtm
    // id Sequence 로직 수행 이후 적용
    var processCodeInfo = req.body;
  //project Id get
  //array list 
    console.log ("/api/putProcessCodeSaveByProjectId : ");
    console.log ("projectId : " + processCodeInfo.projectId + ":");
    console.log ("processId : " + processCodeInfo.processCodeId+ ":");
    console.log ("processName : " + processCodeInfo.processCodeName+ ":");
  //mes.get_seq('seq_processIdByProjectId')
  //INSERT INTO mes.process_real_desc
//(`NO`, PROCESS_CD, PROCESS_NM, seq_process_no, WORK_CD, PROJECT_CD, real_work_count, real_start_dt, real_finish_dt, process_hour, PROCESS_min, other_process_hour, other_process_min, self_process_hour, self_process_min, `ATTRIBUTE`, finish_stat, start_yn, finish_yn, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM)
//VALUES(0, '', '', 0, '', '', 0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '');

    conn.executeQueryTx("INSERT INTO mes.process_plan_desc \
                          (`NO`, PROCESS_CD, PROCESS_NM, PROJECT_CD, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM ) \
                          VALUES (mes.get_seq('seq_processIdByProjectId'), ?, ?, ?, ?, now(), ?, now() ) ",
                          [ processCodeInfo.processCodeId, processCodeInfo.processCodeName, processCodeInfo.projectId ,'SYSTEM','SYSTEM'],
                          function(result){
                            console.log("In Index : " + JSON.stringify(result));
                            res.send(JSON.stringify(result));
    });
  });
  router.post('/api/delProcessCodeRealByProjectId', function(req, res, next) {
    console.log ("putProcessCode.js /api/delProcessCodeRealByProjectId >>>>>1 >> ");
    //cry_by / crt_dtm 은 추가해야함. mod_by, mod_dtm
    // id Sequence 로직 수행 이후 적용
    var processCodeInfo = req.body;
  //project Id get
  //array list 
    console.log ("/api/delProcessCodeRealByProjectId : ");
    console.log ("projectId : " + processCodeInfo.projectId + ":");
    console.log ("processId : " + processCodeInfo.processCodeId+ ":");
    console.log ("processName : " + processCodeInfo.processCodeName+ ":");
  //mes.get_seq('seq_processIdByProjectId')
  //INSERT INTO mes.process_real_desc
//(`NO`, PROCESS_CD, PROCESS_NM, seq_process_no, WORK_CD, PROJECT_CD, real_work_count, real_start_dt, real_finish_dt, process_hour, PROCESS_min, other_process_hour, other_process_min, self_process_hour, self_process_min, `ATTRIBUTE`, finish_stat, start_yn, finish_yn, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM)
//VALUES(0, '', '', 0, '', '', 0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '');

    conn.executeQueryTx(" DELETE  FROM mes.process_plan_desc \
                          WHERE PROCESS_CD = ? AND PROJECT_CD = ? ",
                          [ processCodeInfo.processCodeId, processCodeInfo.projectId ],
                          function(result){
                            console.log("In Index : " + JSON.stringify(result));
                            res.send(JSON.stringify(result));
    });
  });
  router.post('/api/putProcessMasterByProjectId', function(req, res, next) {
    console.log ("putProcessMaster.js /api/putProcessCodeByProjectId >>>>>1 >> ");
    //cry_by / crt_dtm 은 추가해야함. mod_by, mod_dtm
    // id Sequence 로직 수행 이후 적용 
    var processCodeInfo = req.body;
  //project Id get
  //array list 
    console.log ("/api/putProcessMasterSaveByProjectId : ");
    console.log ("projectId : " + processCodeInfo.projectId + ":");
    console.log ("processId : " + processCodeInfo.processCodeId+ ":");
    console.log ("processName : " + processCodeInfo.processCodeName+ ":");
  //mes.get_seq('seq_processIdByProjectId')
  //INSERT INTO mes.process_real_desc
//(`NO`, PROCESS_CD, PROCESS_NM, seq_process_no, WORK_CD, PROJECT_CD, real_work_count, real_start_dt, real_finish_dt, process_hour, PROCESS_min, other_process_hour, other_process_min, self_process_hour, self_process_min, `ATTRIBUTE`, finish_stat, start_yn, finish_yn, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM)
//VALUES(0, '', '', 0, '', '', 0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '');

    conn.executeQueryTx("INSERT INTO mes.process_master \
                          (`NO`, PROCESS_CD, PROCESS_NM, SEQ_PROCESS_NO, WORK_CD, \
                            PROJECT_CD, `DEPTH`, PROCESS_GBN, PROCESS_REQ_NO, \
                            PROCESS_EMP_NO,  PROCESS_COMP_NO, PROCESS_COMP_GBN, \
                            START_DT, FINISH_DT, EQUIPMENT_CD, MATERIAL_CD, \
                            PART_CD, COMPRESS_RATE, CAVITY, MOD_BY, MOD_DTM ) \
                            ON DUPLICATE KEY UPDATE \
                          VALUES (mes.get_seq('seq_processIdByProjectId'), ?, ?, ?, ?, now(), ?, now()  \
                          'NO'= ? , PROCESS_CD=?, PROCESS_NM=?, SEQ_PROCESS_NO = mes.get_seq('seq_processIdByProjectId'), \
                          PROCESS_EMP_NO =? ", 
                          [ processCodeInfo.processCodeId, processCodeInfo.processCodeName, processCodeInfo.projectId ,'SYSTEM','SYSTEM'],
                          function(result){
                            console.log("In Index : " + JSON.stringify(result));
                            res.send(JSON.stringify(result));
                          
    });
  });
  router.post('/api/putProcessPlanByProjectId', function(req, res, next) {
    console.log ("putProcessPlan.js /api/putProcessPlanByProjectId >>>>>1 >> ");
    //cry_by / crt_dtm 은 추가해야함. mod_by, mod_dtm
    // id Sequence 로직 수행 이후 적용
    var processCodeInfo = req.body;
  //project Id get
  //array list 
    console.log ("/api/putProcessPlanByProjectId : ");
    console.log ("projectId : " + processCodeInfo.projectId + ":");
    console.log ("processId : " + processCodeInfo.processCodeId+ ":");
    console.log ("processName : " + processCodeInfo.processCodeName+ ":");
  //mes.get_seq('seq_processIdByProjectId')
  //INSERT INTO mes.process_real_desc
//(`NO`, PROCESS_CD, PROCESS_NM, seq_process_no, WORK_CD, PROJECT_CD, real_work_count, real_start_dt, real_finish_dt, process_hour, PROCESS_min, other_process_hour, other_process_min, self_process_hour, self_process_min, `ATTRIBUTE`, finish_stat, start_yn, finish_yn, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM)
//VALUES(0, '', '', 0, '', '', 0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '');

    conn.executeQueryTx("INSERT INTO mes.process_plan_desc \
                          (`NO`, PROCESS_CD, PROCESS_NM, PROJECT_CD, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM ) \
                          VALUES (mes.get_seq('seq_processIdByProjectId'), ?, ?, ?, ?, now(), ?, now() ) ",
                          [ processCodeInfo.processCodeId, processCodeInfo.processCodeName, processCodeInfo.projectId ,'SYSTEM','SYSTEM'],
                          function(result){
                            console.log("In Index : " + JSON.stringify(result));
                            res.send(JSON.stringify(result));
    });
  });

module.exports = router;