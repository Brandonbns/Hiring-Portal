const Sequelize = new require('sequelize');
const db = require('../../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const Job = db.define('job', {
    id: {
        type: DataTypes.INTEGER,
        field: 'job_id',
        primaryKey: true
    },
    title: DataTypes.STRING,
    skills: DataTypes.STRING,
    salary: DataTypes.INTEGER,
    description: DataTypes.STRING,
    job_status: DataTypes.STRING,
    no_of_openings: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
});

module.exports = Job;

// `jobID` int(11) NOT NULL AUTO_INCREMENT,
// `title` varchar(25) DEFAULT NULL,
// `skills` varchar(100) DEFAULT NULL,
// `salary` int(11) DEFAULT NULL,
// `description1` varchar(100) DEFAULT NULL,
// `jobstatus` varchar(20) DEFAULT NULL,
// `noOfOpenongs` int(11) DEFAULT NULL,
// `deadline` date DEFAULT NULL,
// `created_at` timestamp NULL DEFAULT NULL,
// `updated_at` timestamp NULL DEFAULT NULL,
