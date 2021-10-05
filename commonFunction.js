var queryStr = '';

var TB_Map = new Map();
TB_Map.set('TB001','io_emp');
TB_Map.set('TB002','io_common_code');

function commonQuery(type,tb_code,field,value,condition) {
    var param1 = 'R';
    var param2 = 'TB001';
    var param3 = 'IO_NO,NAME,JUMIN_NO,PASSPORT_NO,GENDER,JC_CD,JW_CD,DEPT_ID,ADDRESS,ADDRESS2,POST_NO';
    //var param4 = 'AD003,최비서,100000003,,F,비서,관리,123457,서울,서초구,1234567';
    //var param3 = '';
    var param4 = 'AD003,권용경,100000003,,M,대표,대표,123456,경기도,우리집,123456,,,,,curdate(),,null,null,null';
    var param5 = "io_no='AD001'"; //where 절

    type = param1;
    tb_code = param2;
    field = param3;
    value = param4;
    condition = param5;

    condition = condition.replace(/g//','/'');

    var paramArray = '';
    switch (type) {
    case 'C' : 
        queryStr = ' insert into ' + TB_Map.get(tb_code);
        //스키마 변경을 고려해서 필드 값은 필수로 있어야 하지만, 예외 case는 만들어 놓음
        if(param3 !=''){
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
            if(paramArray[i].indexOf('(') > -1 || paramArray[i]=='null'){                            
                queryStr += paramArray[i];
            } else {
                queryStr += "'" + paramArray[i] + "'";
            }
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
        queryStr += " where " + condition;
        
        //+ TB_Map.get(tb_code);
        break;
    defualt : break;
    }

    return queryStr;
}

module.exports = {
    commonQuery: commonQuery
}