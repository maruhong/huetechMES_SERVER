var queryStr = '';

var TB_Map = new Map();
TB_Map.set('TB001','io_emp');
TB_Map.set('TB002','io_common_code');

//request를 파라미터로 전달시 사용
function fn_makeCommonQuery_req(req){
    var type = req.query.type;
    var tb_code = req.query.tb_code;
    var field = req.query.field;
    var value = req.query.value;
    var condition = req.query.condition;

    return fn_makeCommonQuery(type, tb_code, field, value, condition);
}

function fn_makeCommonQuery(type, tb_code, field, value, condition) {
    /*
    var param1 = 'C';
    var param2 = 'TB001';
    var param3 = 'IO_NO,NAME,GENDER,JC_CD';
    //var param4 = 'AD003,최비서,100000003,,F,비서,관리,123457,서울,서초구,1234567';
    //var param3 = '';
    var param4 = 'AD001,김기석,M,팀장'; // 날짜 curdate()
    var param5 = "io_no='AD001'"; //where 절
    */

    //value = "'cj'";
    //condition = "io_no='AD001'";//get 방식으로는 '가 포함되어 오류 발생하기 때문에 하드코딩으로 테스트


    /*
    type = param1;
    tb_code = param2;
    field = param3;
    value = param4;
    condition = param5;
    */
   //http://localhost:3000/api/empInfo/getEmpInfo?type=C&tb_code=TB001&field=IO_NO,NAME,GENDER,JC_CD&value=AD001,kks,M,tj&condition=
   //http://localhost:3000/api/empInfo/getEmpInfo?type=C&tb_code=TB001&field=IO_NO,NAME,GENDER,JC_CD&value=AD002,kyk,M,tj&condition=
   //http://localhost:3000/api/empInfo/getEmpInfo?type=R&tb_code=TB001&field=IO_NO,NAME,GENDER,JC_CD&value=&condition=io_no='AD001'
   //http://localhost:3000/api/empInfo/getEmpInfo?type=U&tb_code=TB001&field=JC_CD&value=cj&condition=io_no=AD001
   //http://localhost:3000/api/empInfo/getEmpInfo?type=D&tb_code=TB001&field=&value=&condition=io_no=AD001

   value = value.replace(/'/g, "\'");
   condition = condition.replace(/'/g, "\'");

    var paramArray = '';
    var paramArray2 = '';
    switch (type) {
    case 'C' : 
        queryStr = ' insert into ' + TB_Map.get(tb_code);
        //스키마 변경을 고려해서 필드 값은 필수로 있어야 하지만, 예외 case는 만들어 놓음
        if(field !=''){
            queryStr += '(';
            paramArray = field.split(',');
            for(var i=0;i<paramArray.length; i++){
                queryStr += paramArray[i];
                if(i < paramArray.length-1){
                queryStr += ',';
                }
            }
            queryStr += ') ';
        }
        queryStr += ' values (';
        paramArray = value.split(',');
        for(var i=0;i<paramArray.length; i++){
            queryStr += paramArray[i];

            if(i < paramArray.length-1){
                queryStr += ',';
            }
        }
        queryStr += ') ';
        break;
    case 'R' :
        queryStr = ' select ';
        paramArray = field.split(',');
        for(var i=0;i<paramArray.length; i++){
            queryStr += paramArray[i];
            if(i < paramArray.length-1){
            queryStr += ',';
            }
        }
        queryStr += ' from ' + TB_Map.get(tb_code) + ' ';
        if(condition != ""){
            queryStr += " where " + condition;
        }

        break;
    case 'U' : 
        queryStr = ' update ' + TB_Map.get(tb_code);
        queryStr += ' set ';

        paramArray = field.split(',');
        paramArray2 = value.split(',');
        for(var i=0;i<paramArray.length; i++){
            queryStr += paramArray[i] + "=" + paramArray2[i];
            if(i < paramArray.length-1){
                queryStr += ',';
            }
        }
        if(condition != ""){
            queryStr += " where " + condition;
        } else {
            //update에 조건이 없이 수행되는 case를 방지
            queryStr = "select 1 from dual "
        }

        break;
    case 'D' : 
        queryStr = ' delete from ' + TB_Map.get(tb_code);

        if(condition != ""){
            queryStr += " where " + condition;
        } else {
            //delete에 조건이 없이 수행되는 case를 방지
            queryStr = "select 1 from dual "
        }

        break;
    defualt : break;
    }

    console.log("queryStr : " + queryStr);

    return queryStr;
}

function fn_makeCommonQuery_callSP(sp_name, param) {

    param = param.replace(/'/g, "\'");
    var paramArray = '';

    var queryStr = ' call ' + sp_name;
    queryStr += '(';
    if(param !=''){
        paramArray = param.split(',');
        for(var i=0;i<paramArray.length; i++){
            queryStr += paramArray[i];
            if(i < paramArray.length-1){
            queryStr += ',';
            }
        }
        queryStr += ') ';
    }

    console.log("queryStr : " + queryStr);

    return queryStr;
}

module.exports = {
    fn_makeCommonQuery_req: fn_makeCommonQuery_req,
    fn_makeCommonQuery: fn_makeCommonQuery,
    fn_makeCommonQuery_callSP: fn_makeCommonQuery_callSP
}