const db = require('../../dbConnect');

//let sql = 'SELECT * FROM interviewer';
module.exports = async function fetch() {
    return new Promise((resolve, reject) => {
        sql = 'SELECT A.applicant_id,A.f_name,A.l_name,A.bio,A.skills,A.img_url,A.work_experience,A.email,C.cv_status as status FROM applicants A,cvs C WHERE A.applicant_id=C.applicant_id';
        db.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(results);
            }
        });
    });
}