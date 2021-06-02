const db = require('../../dbConnect');





async function fetchJobs() {
    return new Promise((resolve, reject) => {
        let sql1 = `SELECT *
                    FROM jobs `
        db.query(sql1, (error, results) => {
            if (error) {
                console.log(error);
                return reject(error)
            }
            else {
              return resolve(results)
            }
        })
    })
}



async function getApplicants(job) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT A.applicant_id,A.f_name,A.l_name,A.email,A.contact_no 
                FROM applicants A , applicantjobs AJ
                WHERE A.applicant_id = AJ.applicant_id
                AND AJ.job_id =?`
        db.query(sql, job.job_id, (error, results) => {
            if (error) {
                console.error(error);
            }
            else {
                return resolve(results);
            }
        })
    })
}


async function getData(jobs) {
    //  return new Promise(async(resolve,reject)=>{
    let Data = []
    Data = await Promise.all(jobs.map(async (job) => {
        let applicants = await getApplicants(job);
        console.log(job,'job');

        return {
            Job: job,
            Applicants: applicants,
            
        }
    }));
    return (Data)
}




async function FetchJobsData() {
    return new Promise(async (resolve, reject) => {
        let jobs = '';
        jobs = await fetchJobs()
        var data = await getData(jobs);
        console.log(data,'data');
        return resolve(data)
   })
}


exports.FetchJobsData = FetchJobsData;
