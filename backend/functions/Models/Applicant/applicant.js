const Sequelize = new require('sequelize');
const db = require('../../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const Applicant = db.define('applicant', {
    id: {
        type: DataTypes.INTEGER,
        field: 'applicant_id',
        primaryKey: true
    },
    f_name: DataTypes.STRING,
    l_name: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    work_experience: DataTypes.INTEGER,
    skills: DataTypes.STRING,
    img_url: DataTypes.STRING, 
    bio: DataTypes.STRING,
    user_name: DataTypes.STRING,
    pw: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    created_at: DataTypes.DATE,
});

module.exports = Applicant;

// `applicant_id` int NOT NULL AUTO_INCREMENT,
 // `f_name` varchar(25) DEFAULT NULL,
  //`l_name` varchar(25) DEFAULT NULL,
  //`contact_no` varchar(15) DEFAULT NULL,
 // `work_experience` int DEFAULT NULL,
  //`skills` varchar(255) DEFAULT NULL,
 // `img_url` varchar(255) DEFAULT NULL,
 // `bio` varchar(255) DEFAULT NULL,
 // `user_name` varchar(15) NOT NULL,
 // `pw` varchar(100) DEFAULT NULL,
 // `email` varchar(50) DEFAULT NULL,
  //`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  //`gender` varchar(45) DEFAULT NULL,