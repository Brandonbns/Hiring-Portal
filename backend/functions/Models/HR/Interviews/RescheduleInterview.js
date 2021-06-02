const db = require('../../dbConnect')

module.exports = async function RescheduleInterview(data) {
    const { interviewers, location, date, startTime, endTime, interviewID } = data;
    var sqlStartTime = startTime.split(' ')[0]
    var sqlEndTime = endTime.split(' ')[0]
    var sqlDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

    const promiseResult = new Promise(async (resolve, reject) => {
        let sql = `UPDATE interviews SET int_date =?,location=?,start_time=?,end_time=?,state="pending" WHERE interview_id=?`
        let data1 = db.query(sql, [sqlDate, location, sqlStartTime, sqlEndTime, interviewID], (error, results) => {
            if (error) {
                return reject(error);
            }
            else {
            }
        });
        let data2
        db.query('DELETE FROM interviewersinterviews WHERE interview_id=?', interviewID, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                data2 = interviewers.map(interviewer => {
                    console.log(interviewer);
                    db.query('INSERT INTO interviewersinterviews VALUES(?,?,"pending")', [interviewID, interviewer.interviewerID], (error, result) => {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            return result
                        }
                    })

                });
            }
        })
        return resolve(data1, data2);
    });
    // }
    return promiseResult
}