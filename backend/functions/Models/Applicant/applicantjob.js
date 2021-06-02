const Sequelize = new require('sequelize');
const db = require('../../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const Applicantjob = db.define('applicantjob', {
    id: {
        type: DataTypes.INTEGER,
        field: 'applicant_job_iD',
        primaryKey: true
    },
    applicant_iD: DataTypes.INTEGER,
    job_iD: DataTypes.INTEGER,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE,
});

module.exports = Applicantjob;

// `applicantjobID` int(11) NOT NULL AUTO_INCREMENT,
// `applicantID` int(11) NOT NULL,
// `jobID` int(11) NOT NULL,
// `created_at` timestamp NULL DEFAULT NULL,