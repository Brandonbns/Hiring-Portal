const express = require("express");
let router = express.Router();

const bodyParser = require('body-parser');
const {FetchInterviewerPendings, FetchInterviewerUpcomings} = require("../../Models/interviewer/FetchInterviewerData");
const UpdateInterviewerAvailability = require("../../Models/interviewer/UpdateInterviewerAvailability");

var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(bodyParser.json())

router
    .route('/pending')
    .post(urlencodedParser, async (req, res) => {
        console.log('responce received from page');
        console.log(req.body, 'response');
        var result = await FetchInterviewerPendings(req.body.interviewerID);
        res.send(result)
        res.end()
    })

router
    .route('/availability')
    .post(urlencodedParser, async (req, res) => {
        console.log('responce received from page');
        console.log(req.body, 'response');
        var result = await UpdateInterviewerAvailability(req.body);
        res.send(result)
        res.end()
    })

router
    .route('/upcoming')
    .post(urlencodedParser, async (req, res) => {
        console.log('responce received from page');
        console.log(req.body, 'response');
        var result = await FetchInterviewerUpcomings(req.body.interviewerID);
        res.send(result)
        res.end()
    })

module.exports = router