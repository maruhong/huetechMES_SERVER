/* const Promise = require("bluebird");
const pool = require("./config");

module.exports = {
    constructor(pool){
        this.pool = pool;
    },
    executeQuery(fn) {
        Promise.using(this.pool.connect(), conn => {
            fn(conn);
        })
    },
    executeQueryTx(fn) {
        Promise.using(this.pool.connect(), conn => {
            conn.beginTransaction(txerr => {
                fn(conn);
            })
        })
    }
}
*/

let mysql = require('mysql');
let config = require('./config');
let conn = null;

function executeQuery(query, callback){
    if(conn == null){
        conn = mysql.createConnection(config.dbInfo);
    }
    console.log(query);
    conn.query(query, function(err, rows, fields){
        if(err) throw err;
        callback(rows);
    });
}

function executeQueryTx(query, param, callback){
    if(conn == null){
        conn = mysql.createConnection(config.dbInfo);
    }
    console.log(query);
    conn.query(query, param, function(err, rows, fields){
        if(err) throw err;
        callback(rows);
    });
}
module.exports = {
    executeQuery: executeQuery,
    executeQueryTx: executeQueryTx
} 