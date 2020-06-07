//-----Archivo para la conexión 
const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b2d125c6f15ab3',
    password: 'd2fa8d47',
    database: 'heroku_f7c22c26a23c2c4'
});

pool.query = util.promisify(pool.query);
module.exports = pool;