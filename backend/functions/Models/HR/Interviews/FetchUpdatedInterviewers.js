const db = require('../../dbConnect');

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
        let sql = `SELECT A.applicant_id,A.f_name,A.l_name,A.email,A.img_url,A.contact_no ,C.cv_url,A.skills,A.work_experience
        FROM applicants A , interviewapplicants IA , cvs C
        WHERE A.applicant_id = IA.applicant_id
        AND C.applicant_id = A.applicant_id
        AND IA.interview_id =?`
       db.query(sql, interview.interview_id, (error, results) => {
            if (error) {
                console.error(error);
            }
            else {
                return resolve( results);
            }
        })
    })

}


async function getData(interview) {
  //  return new Promise(async(resolve,reject)=>{   
        let interviewers = await getInterviewers(interview);
        let applicants =  await getApplicants(interview);
        console.log(applicants,interview.interview_id);
        console.log(interviewers,'interviewers');
       let Data={
        Interview:  interview,
        Applicants:  applicants,
        Interviewers: interviewers
       }
    
       
   
    
    return (Data)
  //  })
    
}




module.exports = async function FetchUpdatedInterviewers(interview) {
    return new Promise (async(resolve,reject)=>{
    
   

    var data = await getData(interview);
    console.log(data,"data");
    return resolve(data)

    })
}
