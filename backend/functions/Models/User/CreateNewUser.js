const db = require("../dbConnect")
const bcrypt = require("bcryptjs");

const createNewUser = (data) => {
    let { fName, userName, email, password, interviewer, hr, admin } = data
    console.log(data, 'data');
    var res = new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                if (hash) {
                    let cols = [fName, userName, email, hash]
                    let sql = "INSERT INTO users (full_name,user_name,email,password) VALUES (?,?,?,?)"
                    db.query(sql, cols, (error, result) => {
                        if (error) {
                            return reject(error)
                        }
                        else {
                            console.log(result.insertId, 'in id...........................................................');
                            //insert into interviewer

                            if (interviewer) {
                                let cols = [fName, userName, email, result.insertId]
                                let sql = "INSERT INTO interviewers (full_name,user_name,email,user_id) VALUES (?,?,?,?)"
                                db.query(sql, cols, (error, results) => {
                                    if (error) {
                                        console.log(error, 'int');
                                        return reject(error)
                                    }
                                    else {
                                        console.log(results.insertId);
                                    }
                                })
                            }
                            if (hr) {

                                let sql = "INSERT INTO hrs (user_id) VALUES (?)"
                                db.query(sql, result.insertId, (error, results) => {
                                    if (error) {
                                        console.log(error, 'hr');
                                        return reject(error)
                                    }
                                    else {
                                        console.log(results.intsertId);
                                    }
                                })
                            }
                            if (admin) {

                                let sql = "INSERT INTO hradmins (user_id) VALUES (?)"
                                db.query(sql, result.insertId, (error, results) => {
                                    if (error) {
                                        console.log(error, 'admin');
                                        return reject(error)
                                    }
                                    else {
                                        console.log(results.intsertId);
                                    }
                                })
                            }

                            return resolve(true)
                        }
                    })
                }

            })




        })


    })
    return res
}

const checkUserAvailable = (userName) => {
    console.log('availability cehck');
    var availability = new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE user_name =?"
        db.query(sql, userName, (error, result) => {
            if (error) {
                console.log(error)
                return reject(error)
            }
            else {
                console.log(result, 'result');
                if (result[0]) {
                    console.log(result, 'result');
                    return resolve(false)
                }
                else return resolve(true)
            }
        })
    })
    return availability
}
exports.createNewUser = createNewUser;
exports.checkUserAvailable = checkUserAvailable