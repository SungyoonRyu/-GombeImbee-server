import sqldb from 'mysql';

const config = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1q2w3e4r!!',
    database: 'nodebook'
};

var sql = sqldb.createConnection(config);

export function connectDB() {
    sql.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id: ' + sql.threadId);
  });
}

export default sql;