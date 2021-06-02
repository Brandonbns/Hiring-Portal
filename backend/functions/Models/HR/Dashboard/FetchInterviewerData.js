const db = require('../../dbConnect');

//let sql = 'SELECT * FROM interviewer';
 module.exports = async function  fetch(){
     return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM interviewers',(error,results)=>{
            if (error){
                return reject (error);
            }else
            {          
            return resolve(results);         
            }
        });
     });
}



