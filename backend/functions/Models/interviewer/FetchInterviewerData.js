const db = require('../dbConnect');

/*********************************************************Pending Interviwes**************************************************************************
 * ****************************************************************************************************************************************************
 */

function FetchInterviewerPendings(intID) {

    return new Promise((resolve, reject) => {
        let sql = `SELECT I.interview_id, I.int_date,I.location,I.start_time,I.end_time
                FROM interviews I, interviewersinterviews II
                WHERE II.interview_id = I.interview_id
                AND II.state = 'pending'
                AND II.interviewer_id= ?`

        db.query(sql, intID, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(result);
                return resolve(result)
            }
        })
    })
}


/*********************************************************Upcoming Interviwes**************************************************************************
 * ****************************************************************************************************************************************************
 */
function FetchInterviewerUpcomings(intID) {

    return new Promise(async (resolve, reject) => {
        
        let interviews = await FetchUpcomings(intID)
        var data = await getData(interviews,intID);
        console.log(data,'data');
        return resolve(data)

    })
}

function FetchUpcomings(intID) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT I.interview_id, I.int_date,I.location,I.start_time,I.end_time
                FROM interviews I, interviewersinterviews II
                WHERE II.interview_id = I.interview_id
                AND II.state = 'available'
                AND II.interviewer_id= ?`

        db.query(sql, intID, (error, result) => {
            if (error) {
                console.log(error)
                return reject(error)
            } else {
                console.log(result, 'result');
                return resolve(result)
            }
        })
    })
}


async function getData(interviews,intID) {
    let Data = []
    Data = await Promise.all(interviews.map(async (interview) => {
        let interviewers = await getInterviewers(interview,intID);
        let applicants = await getApplicants(interview);

        return {
            Interview: interview,
            Applicants: applicants,
            Interviewers: interviewers
        }
    }));
    return (Data)
}

async function getInterviewers(interview,intID) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT I.interviewer_id,I.full_name,I.email ,II.state
                    FROM interviewers I , interviewersinterviews II
                    WHERE I.interviewer_id = II.interviewer_id
                    AND II.interview_id =?
                    AND II.interviewer_id not in(?)`
        db.query(sql, [interview.interview_id,intID], (error, results) => {
            if (error) {
                console.error(error);
            }
            else {
                return resolve(results)
            }
        })
    })
}

async function getApplicants(interview) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT A.applicant_id,A.f_name,A.l_name,A.email,A.contact_no 
                FROM applicants A , interviewapplicants IA
                WHERE A.applicant_id = IA.applicant_id
                AND IA.interview_id =?`
        db.query(sql, interview.interview_id, (error, results) => {
            if (error) {
                console.error(error);
            }
            else {
                return resolve(results);
            }
        })
    })
}


/*********************************************************Upcoming Interviwes**************************************************************************
 * ****************************************************************************************************************************************************
 */

exports.FetchInterviewerPendings = FetchInterviewerPendings;
exports.FetchInterviewerUpcomings = FetchInterviewerUpcomings