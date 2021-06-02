const db = require ('../dbConnect')

module.exports = function UpdateInterviewerAvailability (data)  {
    const {interviewID,interviewerID,status} = data
    console.log(data,'data');
    return new Promise((resolve,reject)=>{
        let sql = `UPDATE interviewersinterviews 
        SET state = ?
        WHERE interview_id = ?
        AND interviewer_id = ?`
        let cols = [status,interviewID,interviewerID]
        console.log(cols,'cols');
        db.query(sql,cols,(err,result)=>{
            if(err){
                console.log(err);
                return reject(err)
            }
            else{
                console.log(result);
                return resolve (result);
            }

        })
        

        
    })
    
}

