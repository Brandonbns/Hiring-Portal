const db = require("../../dbConnect");

//let sql = 'SELECT * FROM interviewer';
module.exports = async function fetch() {
  return new Promise((resolve, reject) => {
    sql = 'SELECT * FROM applicantjobs WHERE status="pending"';
    db.query(sql, (error, results) => {
      if (error) {
        console.log(error, "db error");
        return reject(error);
      } else {
        return resolve(results);
      }
    });
  });
};
