const Promise = require("bluebird");
const pool = require("./pool.js");

module.exports = {
    constructor(pool){
        this.pool = pool;
    },
    execute(fn) {
        Promise.using(this.pool.connect(), conn => {
            fn(conn);
        })
    },
    executeTx(fn) {
        Promise.using(this.pool.connect(), conn => {
            conn.beginTransaction(txerr => {
                fn(conn);
            })
        })
    }
}