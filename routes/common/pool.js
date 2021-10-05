const mysql = require("mysql"),
      util = require("util"),
      Promise = require("bluebird");

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_INFO = {
    host : 'localhost:3306',
    user : 'huetech',
    password : '!Q@W#E$R',
    database : 'MES',
    multipleStatements : true,
    connectionLimit : 10,
    waitForConnections : false
};

module.exports = class {
    constructor(dbinfo) {
        dbinfo = dbinfo || DB_INFO;
        this.pool = mysql.createPool(dbinfo);
    }
    connect() {
        return this.pool.getConnectionAsync().disposer( conn => {
            return conn.release();
        });
    }
    
    end() {
        this.pool.end( function(err) {
            util.log(">>>>>>>>>>>>>>>>>>>>>>> End of Pool !!!!");
            if(err)
                util.log("ERR POOL Ending !!!");
        });
    }
};
