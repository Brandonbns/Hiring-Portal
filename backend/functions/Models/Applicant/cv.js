const Sequelize = new require('sequelize');
const db = require('../../config/connection');
const DataTypes = require('sequelize/lib/data-types');

const Cv = db.define('cv', {
    id: {
        type: DataTypes.INTEGER,
        field: 'cv_iD',
        primaryKey: true
    },
    applicant_id: DataTypes.INTEGER,
    cv_url: DataTypes.STRING,
    cv_status: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
});

module.exports = Cv;

// `cvID` int(11) NOT NULL AUTO_INCREMENT,
// `applicantID` int(11) NOT NULL,
// `cvUrl` varchar(100) DEFAULT NULL,
// `cvStatus` varchar(100) DEFAULT NULL,
// `created_at` timestamp NULL DEFAULT NULL,
// `updated_at` timestamp NULL DEFAULT NULL,