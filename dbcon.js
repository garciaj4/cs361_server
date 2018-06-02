var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_jarcd',
  password        : '7720',
  database        : 'cs361_jarcd'
});
module.exports.pool = pool;