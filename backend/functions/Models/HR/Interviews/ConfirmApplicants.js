const db = require('../../dbConnect');

module.exports = (data) => {
    data.forEach(applicant => {
        let sql = `UPDATE cvs SET cv_status = 'confirmed' WHERE applicant_id =${applicant}`
        db.query(sql, (err, result)=>{
            if (err) console.log(err);

        })

    });

}