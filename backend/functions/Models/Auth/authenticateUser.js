const bcrypt = require("bcryptjs");
const db = require("../dbConnect")

const authenticateUser = (data) => {
    return new Promise((resolve, reject) => {
        const { username, password } = data


        let sql = "SELECT user_name,password FROM users WHERE user_name=?"
        db.query(sql, [username], (err, result) => {

            if (result[0]) {
                bcrypt.compare(password, result[0].password).then(isMatch => {
                    if (isMatch) {
                        return resolve(true)
                    }
                    else {
                        return resolve(false)
                    }
                })

            }
            else if (err) {
                console.log(err);
                console.log('no user');
                return resolve(false);

            }
            else return resolve(false);
        })
    })
}


const getAuthInfo = ({ username }) => {
    return new Promise(async (resolve, reject) => {
        let userID = await getUserID(username)
        let interviewer = await interviewerCheck(userID)
        let admin = await adminCheck(userID);
        let hr = await hrCheck(userID)

        return resolve({
            admin: await admin,
            interviewer: await interviewer,
            hr: await hr
        })
    })

}

function getUserID(username) {
    return new Promise((resolve, reject) => {

        let sql = "SELECT user_id FROM users WHERE user_name = ? "
        db.query(sql, [username], (err, result) => {

            if (result[0]) {
                console.log(result, 'user');
                return resolve(result[0].user_id)

            }
            else if (err) {
                console.log(err);
                console.log('no user');
            }
            ;
        })
    })
}
function adminCheck(id) {

    return new Promise((resolve, reject) => {
        let sql = "SELECT admin_id FROM hradmins WHERE user_id=?"
        db.query(sql, id, (err, result) => {
            if (result[0]) {

                console.log(result, 'admin');
                return resolve({
                    isAdmin: true,
                    admin_id: result[0].admin_id
                })
            }
            else {
                return resolve({
                    isAdmin: false,
                    admin_id: null
                })
            }


        })
    })
}

function hrCheck(id) {

    return new Promise((resolve, reject) => {
        let sql = "SELECT hr_id FROM hrs WHERE user_id=?"
        db.query(sql, id, (err, result) => {
            if (result[0]) {


                return resolve({
                    isHr: true,
                    hr_id: result[0].hr_id
                })
            }
            else {
                return resolve({
                    isHr: false,
                    hr_id: null
                })
            }


        })
    })
}






function interviewerCheck(id) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT interviewer_id FROM interviewers WHERE user_id=?"
        db.query(sql, id, (err, result) => {
            if (result[0]) {
                console.log(result, 'interviewer');
                return resolve({
                    isInterviewer: true,
                    interviewer_id: result[0].interviewer_id
                })
            }
            else {
                return resolve({
                    isInterviewer: false,
                    interviewer_id: null
                })
            }


        })
    }
    )
}




exports.authenticateUser = authenticateUser
exports.getAuthInfo = getAuthInfo