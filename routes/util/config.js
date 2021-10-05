let dbInfo = {
    host: 'localhost',
    port: '3306',
    user: 'huetech',
    password: '!Q@W#E$R',
    database: 'mes' 
}

function test(){
    console.log('test');
}

module.exports = {
    dbInfo: dbInfo,
    test: test,
    secret: 'HueTECHmeSERversySTEM!!',
    jwtSession: {  session: true  }
}