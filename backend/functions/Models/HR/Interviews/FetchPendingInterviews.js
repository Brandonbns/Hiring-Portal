const db = require('../../dbConnect');

async function fetchPendingInterviews(params) {
    return new Promise((resolve, reject) => {
        let sql1 = `SELECT interview_id,location,int_date,start_time,end_time 
                    FROM interviews 
                    WHERE state ="pending"`
        db.query(sql1, (error, results) => {
            if (error) { console.log(error); }
            else {
                return resolve(results)
            }
        })
    })
}

async function fetchInterviews(params) {
    return new Promise((resolve, reject) => {
        let sql1 = `SELECT interview_id,location,int_date,start_time,end_time 
                    FROM interviews 
                    WHERE  state in ('pending','confirmed')`
        db.query(sql1, (error, results) => {
            if (error) { console.log(error); }
            else {
                return resolve(results)
            }
        })
    })
}

async function fetchInterviewsData(params) {
    return new Promise((resolve, reject) => {
        let sql1 = `SELECT *
                    FROM interviews `
        db.query(sql1, (error, results) => {
            if (error) { console.log(error); }
            else {
              return resolve(results)
            }
        })
    })
}

async function getInterviewers(interview) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT I.interviewer_id,I.full_name,I.email ,II.state
                    FROM interviewers I , interviewersinterviews II
                    WHERE I.interviewer_id = II.interviewer_id
                    AND II.interview_id =?`
        db.query(sql, interview.interview_id, (error, results) => {
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
        let sql = `SELECT A.applicant_id,A.f_name,A.l_name,A.email,A.contact_no,A.img_url ,C.cv_url,A.skills,A.work_experience
                FROM applicants A , interviewapplicants IA , cvs C
                WHERE A.applicant_id = IA.applicant_id
                AND C.applicant_id = A.applicant_id
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


async function getData(interviews) {
    //  return new Promise(async(resolve,reject)=>{
    let Data = []
    Data = await Promise.all(interviews.map(async (interview) => {
        let interviewers = await getInterviewers(interview);
        let applicants = await getApplicants(interview);
        

        return {
            Interview: interview,
            Applicants: applicants,
            Interviewers: interviewers
        }
    }));
    return (Data)
}

function convertToObject(interview, interviewers, applicants) {
    return {
        interview: interview,
        applicants: applicants,
        interviewers: interviewers
    }
}


async function FetchPendingInterviews() {
    return new Promise(async (resolve, reject) => {
        let interviews = '';
        interviews = await fetchPendingInterviews()
        var data = await getData(interviews);
        return resolve(data)
    })
}

async function FetchInterviews() {
    return new Promise(async (resolve, reject) => {
        let interviews = '';
        interviews = await fetchInterviews()
        var data = await getData(interviews);
        return resolve(data)
    })
}

async function FetchInterviewsData() {
    return new Promise(async (resolve, reject) => {
        let interviews = '';
        interviews = await fetchInterviewsData()
        var data = await getData(interviews);
        return resolve(data)
   })
}

exports.FetchPendingInterviews = FetchPendingInterviews;
exports.FetchInterviews = FetchInterviews;
exports.FetchInterviewsData = FetchInterviewsData;
