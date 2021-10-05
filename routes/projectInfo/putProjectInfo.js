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
router.post('/api/putProjectInfo', function(req, res, next) {
  console.log ("putProjectInfo.js /api/putProjectInfo >>>>>1 >> ");
  //cry_by / crt_dtm 은 추가해야함. mod_by, mod_dtm
  // id Sequence 로직 수행 이후 적용
  var projectInfo = req.body;

  console.log ("/api/putProjectInfo : ");

  console.log ("projectInfo : " + projectInfo.projectCd);
  
  console.log ("projectName : " + projectInfo.projectName);
  console.log ("modelName : " + projectInfo.modelName);
  console.log ("attribute : " + projectInfo.attribute);


  conn.executeQueryTx("INSERT INTO mes.project_master \
          (`NO`, project_cd, project_nm, model_nm, `attribute`, sort_order, project_emp_no, \
          project_customer_id, cavity, cad, cam, project_material, crt_by, crt_dtm, mod_by, mod_dtm, project_img ) \
          VALUES ('12', ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ? ,now() ,? ,now(), ?)",
          [ projectInfo.projectCd,  projectInfo.projectName, projectInfo.modelName,
          projectInfo.attribute,  projectInfo.mgrEmpNo, projectInfo.customerId, 
          projectInfo.cavity, projectInfo.cadEmpNo, projectInfo.camEmpNo,
          projectInfo.material, projectInfo.mgrEmpNo,  projectInfo.mgrEmpNo, projectInfo.drawImagePath ],
          function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.post('/api/putProjectDescInfo', function(req, res, next) {
  console.log ("putProjectdescInfo.js /api/putProjectDescInfo >>>>>1 >> ");
  //cry_by / crt_dtm 은 추가해야함. mod_by, mod_dtm
  // id Sequence 로직 수행 이후 적용
  var projectInfo = req.body;

  console.log ("/api/putProjectDescInfo : ");

  console.log ("projectInfo : " + projectInfo.projectCd);
  
  console.log ("projectName : " + projectInfo.projectName);
  console.log ("modelName : " + projectInfo.modelName);
  console.log ("attribute : " + projectInfo.attribute);


  conn.executeQueryTx("INSERT INTO mes.project_desc \
  (`NO`, PROJECT_CD, seq_project_cd, REAL_START_DT, REAL_END_DT, REAL_WORK_COUNT, PROJECT_PRICE, `ATTRIBUTE`, \
   DUE_DT, accept_dt, manager_info, project_gbn, outside_support_company_cd, draw_image_path, draw_image_name, \
   draw_image_id, cad_file_path, cad_file_name, cad_file_id, cam_file_path, cam_file_name, cam_file_id, \
   ord_file_path, ord_file_name, ord_file_id, est_file_path, est_file_name, est_file_id, CRT_BY, CRT_DTM, MOD_BY, MOD_DTM ) \
  VALUES(12, ?, 0, ?, ?, 0, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), ?, now()) ",
          [ projectInfo.projectCd,  projectInfo.seqProjectCd, projectInfo.realStartDt,
          projectInfo.realEndDt,  projectInfo.realWorkCount, projectInfo.projectPrice, projectInfo.attribute, 
          projectInfo.dueDt, projectInfo.acceptDt, projectInfo.managerInfo, projectInfo.projectGbn, projectInfo.outSideCompanyCd,
          projectInfo.drawImagePath,projectInfo.drawImageName, projectInfo.drawImageId, 
          projectInfo.cadFilePath,projectInfo.cadFileName, projectInfo.cadFileId,
          projectInfo.camFilePath,projectInfo.camFileName, projectInfo.camFileId,
          projectInfo.ordFilePath,projectInfo.ordFileName, projectInfo.ordFileId,
          projectInfo.estFilePath,projectInfo.estFileName, projectInfo.estFileId,
          projectInfo.mgrEmpNo,  projectInfo.mgrEmpNo ],
          function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/putProjectListInfo/:projectInfo', function(req, res, next) {
  console.log ("putProjectInfo.js /api/putProjectCdList >>>>>1 ")
  conn.executeQuery("SELECT a.project_cd FROM PROJECT_MASTER a ", function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

router.get('/api/getProjectInfo/:projectCd', function(req, res, next) {
  let projectCd = req.params.projectCd;
  //console.log ("getProjectInfo/:projectCd.js >>>>>1 " + projectCd)
  conn.executeQueryTx("SELECT A.*, B.* FROM PROJECT_MASTER A, PROJECT_DESC B WHERE A.PROJECT_CD = B.PROJECT_CD AND A.PROJECT_CD = ? ", projectCd, function(result){
    console.log("In Index : " + JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
