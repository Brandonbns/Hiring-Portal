const express = require('express');
const config = require('../../common/environment.json')['local'];
const routeConstant = require('../../common/route-constant');
let router = express.Router();
const path = require('path');

    const API_PREFIX = '';

    
    router.get('/', function (req, res) {
        res.send('Welcome to HIRING PORTAL  API - V - 1');
    });

    router.use( routeConstant.APPLICANT.PREFIX, require('./applicantRoute'));
    router.use( routeConstant.APPLICANTJOB.PREFIX, require('./applicantjobRoute'));
    router.use( routeConstant.CV.PREFIX, require('./cvRoute'));
    router.use( routeConstant.JOB.PREFIX, require('./jobRoute'));

    module.exports = router
