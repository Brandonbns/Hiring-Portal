const db = require('../../dbConnect');

//let sql = 'SELECT * FROM interviewer';
 module.exports = async function  fetch(data){
     const {interview} =data
     return new Promise((resolve,reject)=>{
         let cols= [interview.interview_id]
         let sql =`SELECT * FROM interviewers WHERE interviewer_id NOT IN 
         (SELECT interviewer_id FROM interviewersinterviews
            WHERE interview_id = ?
            AND state  IN ('available','not-available','pending'))`
        db.query(sql,cols,(error,results)=>{
            if (error){
                return reject (error);
            }else
            {
                console.log(results,'dbres');         
            return resolve(results);       
            }
        });
     });
}
