const mysql = require('mysql'); 

const conn = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1q2w3e4r!!',
    database: 'test'
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속
 
let sql = "INSERT INTO `members` (`username`,`password`) VALUES ('test','test');";
 
connection.query(sql, function (err, results, fields) {
    if (err) {
        console.log(err);
    }
    console.log(results);
});
 
sql = "SELECT * FROM MEMBERS";
 
connection.query(sql, function (err, results, fields) { 
    if (err) {
        console.log(err);
    }
    console.log(results);
});
 
 
connection.end(); // DB 접속 종료