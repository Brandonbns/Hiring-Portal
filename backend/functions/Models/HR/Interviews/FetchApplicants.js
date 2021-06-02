const { response } = require('express');
const db = require('../../dbConnect');

//let sql = 'SELECT * FROM interviewer';
module.exports = async function fetch() {
    return new Promise((resolve, reject) => {
        sql = 'SELECT A.applicant_id,A.f_name,A.l_name,A.bio,A.skills,A.img_url,A.work_experience,A.email,C.cv_url FROM applicants A,cvs C WHERE A.applicant_id=C.applicant_id AND C.cv_status = "accepted-pending"';
        db.query(sql,async (error, results) => {
            if (error) {
                return reject(error);
            } else {
                
                let data = await Promise.all(results.map(async applicant => {
                    let jobs = await getJobs(applicant.applicant_id)
                    


                    return {
                        ...applicant,
                        jobs:jobs

                    }
                }))
                console.log(data);
                return resolve(data);
            }
        });
    });
}

function getJobs(applicant){
    return new Promise((resolve,reject)=>{
        let sql = `SELECT J.title FROM jobs J , applicantjobs AJ
        WHERE J.job_id = AJ.job_id
        AND AJ.applicant_id = ${applicant} ` 
        db.query(sql,(error,jobs)=>{
            if(error){
                return reject(error)
            }
            else{
                return resolve(jobs)
            }
        })
    })
}