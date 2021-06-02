const db = require("../../dbConnect");

const getJobs = (req, res) => {
  const sql = "SELECT title,job_id FROM jobs;";
  db.query(sql, (error, results) => {
    if (error) throw error;
    console.log(results, "result in req");
    res.send(results);
  });
};

const sortJob = (req, res) => {
  const { selectedJob } = req.body;
  const sql = `SELECT skills FROM jobs WHERE job_id="${selectedJob}";`;
  db.query(sql, (error, results) => {
    if (error) throw error;

    const skillSet = new Set(results[0].skills.split(","));

    const sql2 = `SELECT A.applicant_id,A.f_name,A.l_name,A.skills,A.bio,A.work_experience,A.gender,C.cv_url
     FROM applicants A, applicantjobs J , cvs C
    WHERE A.applicant_id = J.applicant_id 
    AND C.applicant_id = A.applicant_id
    AND J.job_id="${selectedJob}"`;
    db.query(sql2, (error, results) => {
      if (error) throw error;

      results = results.map((result) => {
        const {
          applicant_id,
          f_name,
          l_name,
          skills,
          bio,
          work_experience,
          gender,
          cv_url,
        } = result;
        return {
          applicant_id,
          f_name,
          l_name,
          skills,
          bio,
          work_experience,
          gender,
          cv_url,
          rating: result.skills
            .split(",")
            .reduce((accumulator, currentValue) => {
              if (skillSet.has(currentValue)) return accumulator + 2;
              else return accumulator + 1;
            }, 0),
        };
      });
      results.sort((a, b) => b.rating - a.rating);
      // results = results.map((result) => result.name);
      console.log(results, "results");
      res.send(results);
    });
  });
};

const acceptApplicant = (req, res) => {
  console.log(req.body, "accpeted");
  const {id,job} = req.body
  let sql1 = `UPDATE applicantjobs SET status ='accepted' WHERE applicant_id = ${id} AND job_id = ${job} `
  db.query(sql1, (error,result)=>{
    if (error){
      console.log(error);
      res.send(error)
      throw(error);
    }
    else{
      let sql2 = `UPDATE cvs SET cv_status = 'accepted-pending' WHERE applicant_id = ${id} AND cv_status NOT IN('confirmed')`
      db.query(sql2,(error,result)=>{
        if(error){
          res.send(error)
          console.log(error)
          throw(error)
        }
        else{
          res.send('successfully confirmed')
        }
      })
    }
  })
};

const rejectApplicant = (req, res) => {
  console.log(req.body, "rejected");
  const {id,job} = req.body
  let sql1 = `UPDATE applicantjobs SET status ='rejected' WHERE applicant_id = ${id} AND job_id = ${job}`
  db.query(sql1, (error,result)=>{
    if (error){
      console.log(error);
      throw(error);
    }
    else{
      res.send('rejected')
      }
  });
};

module.exports = { getJobs, sortJob, rejectApplicant, acceptApplicant };
