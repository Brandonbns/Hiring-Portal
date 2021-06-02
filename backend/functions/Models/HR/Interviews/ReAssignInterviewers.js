const db = require('../../dbConnect')

module.exports = async function ReAssignInterviewers(data) {
    const { interview, interviewers } = data;
    console.log(data,'data');
    const promiseResult = new Promise(async (resolve, reject) => {
        let deleted = await db.query('DELETE FROM interviewersinterviews WHERE interview_id =? AND state="not-available"', interview.interview_id, (error, result) => {
            if (error) {
                console.log(error,'error occuered');
            }
            else {
                console.log(result, 'deleted');
                return result
            }
        })
        let reassigned = await interviewers.map(interviewer => {
            console.log(interviewer);
            db.query('INSERT INTO interviewersinterviews VALUES(?,?,"pending")', [interview.interview_id, interviewer.interviewerID], (error, result) => {
                if (error) {
                    console.log(error,'error occured');
                }
                else {
                    console.log(result, 'reassigned');
                    return result
                }
            })
        })
        return resolve([deleted,'deleted',reassigned,'reassigned'])
   })
    return promiseResult
}
