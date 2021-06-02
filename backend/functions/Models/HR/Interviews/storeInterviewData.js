const db = require('../../dbConnect')

 async function storeInterviewData(data) {
   

    const {interviewers,location,date,selectedApplicants,startTime,endTime} = data;
   var sqlStartTime = startTime.split(' ')[0]
   var sqlEndTime = endTime.split(' ')[0]
   console.log(sqlStartTime,'sqltime');
      var sqlDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    const promiseResult = new Promise((resolve, reject) => {
        db.query('INSERT INTO interviews (int_date,location,start_time,end_time,state) VALUES(?,?,?,?,"pending")', [sqlDate, location,sqlStartTime,sqlEndTime], (error, results) => {
            if (error) {
                return reject(error);
            }
            else {
                console.log(results.insertId);
                interviewers.forEach(interviewer => {
                    
                    db.query('INSERT INTO interviewersinterviews VALUES(?,?,"pending")',[results.insertId,interviewer.interviewerID],(error,result)=>{
                        if(error){
                            console.log(error);
                            return reject(error);
                        }
                        else{
                            console.log(result);
                        }
                    })                  
                });
                selectedApplicants.forEach(applicant=>{
                    db.query('INSERT INTO interviewapplicants VALUES(?,?)',[results.insertId,applicant],(error,result)=>{
                        if(error){
                            console.log(error);
                            return reject(error);
                        }
                        else{
                            console.log(result,'applicants result');
                        }
                    })
                })              
           return resolve(results);
            }
        });
    });

return promiseResult
}

async function assignApplicant(data){
    console.log(data,'data');
    const {interview,applicants} =data
    const promiseResult = new Promise((resolve, reject) => {
        db.query('INSERT INTO interviewapplicants VALUES(?,?)',[interview.interview_id,applicants[0].applicant_id],(error,result)=>{
            if(error){
                console.log(error);
                return reject (error)
            }
            else{
                console.log(result,'applicants result');
                return resolve(result)
            }
        })



    })
    return promiseResult;
}

async function confirmInterview(data){
    console.log(data,'data');
    const {interview,applicants} =data
    const promiseResult = new Promise((resolve, reject) => {
        db.query('UPDATE interviews SET state = "confirmed" WHERE interview_id =?',[interview.interview_id],(error,result)=>{
            if(error){
                console.log(error);
                return reject (error)
            }
            else{
                console.log(result,'confirmed');
                return resolve(result)
            }
        })



    })
    return promiseResult;
}

exports.storeInterviewData =storeInterviewData
exports.assignApplicant = assignApplicant
exports.confirmInterview = confirmInterview
