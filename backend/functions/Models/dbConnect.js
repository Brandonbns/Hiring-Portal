const mysql = require('mysql-await');

    const db = mysql.createConnection({
        host : 'sql6.freemysqlhosting.net',
        user : 'sql6415669',
        password : 'M55HLPXZaf',
        database : 'sql6415669',
        multipleStatements : true
    });
     
    
    db.connect(function(err){
        if(err){
            console.log('DB error',err);
            throw err;
            return false;
        }
    });

module.exports = db;


// Server: sql6.freemysqlhosting.net
// Name: sql6415669
// Username: sql6415669
// Password: M55HLPXZaf
// Port number: 3306


// const db = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : 'mydb',
//     database : 'hiring_portal_db',
//     multipleStatements : true
// });