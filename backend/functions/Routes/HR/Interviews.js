const express = require("express");
let router = express.Router();
const path = require('path');

//controllers
const FetchInterviewers = require("../../Models/HR/Interviews/FetchInterviewers");
const sendInterviewerEmails = require('../../Models/HR/Interviews/SendInterviewerEmails')
const { storeInterviewData, assignApplicant, confirmInterview } = require('../../Models/HR/Interviews/storeInterviewData');
const FetchApplicants = require('../../Models/HR/Interviews/FetchApplicants');
const { FetchPendingInterviews, FetchInterviews, FetchInterviewsData } = require("../../Models/HR/Interviews/FetchPendingInterviews");
const confirmApplicants= require('../../Models/HR/Interviews/ConfirmApplicants')
const bodyParser = require('body-parser');
const SendApplicantEmails = require("../../Models/HR/Interviews/SendApplicantEmails");
const SendReminders = require("../../Models/HR/Interviews/SendReminders");
const GetRescheduleInterviewers = require("../../Models/HR/Interviews/GetRescheduleInterviewers");
const ReAssignInterviewers = require("../../Models/HR/Interviews/ReAssignInterviewers");
const FetchUpdatedInterviewers = require("../../Models/HR/Interviews/FetchUpdatedInterviewers");
const RescheduleInterview = require("../../Models/HR/Interviews/RescheduleInterview");

var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(bodyParser.json())
router.use(express.static(path.join(__dirname, '../', 'public')))


router
    .route("/Interviewers")
    .get(async (req, res) => {
        let result = await FetchInterviewers();
        res.send(result);
        res.end();

    })

router
    .route('/scheduleInterview')
    .post(urlencodedParser, async (req, res) => {
        var result = await storeInterviewData(req.body);
        if(result.insertId){
            await sendInterviewerEmails(req.body);
        
        //confirmApplicants(req.body.selectedApplicants)
        res.send(result.insertId);
        res.end();}
        

    })

router
    .route('/rescheduleInterview')
    .post(urlencodedParser, async (req, res) => {
        await sendInterviewerEmails(req.body);
        var result = await RescheduleInterview(req.body);
        res.send(result);
        res.end();

    })

router
    .route('/reassignInterviewers')
    .post(urlencodedParser, async (req, res) => {
        await sendInterviewerEmails(req.body);
        var result = await ReAssignInterviewers(req.body)
        res.send(result);
        res.end();

    })

router
    .route("/applicants")
    .get(async (req, res) => {
        let result = await FetchApplicants();
        res.send(result);
        res.end();

    })

router
    .route("/pendingInterviews")
    .get(async (req, res) => {
        let result = await FetchPendingInterviews();
        res.send(result);
        res.end();

    })

router
    .route("/Interviews")
    .get(async (req, res) => {
        let result = await FetchInterviews();
        res.send(result);
        res.end();

    })

router
    .route("/InterviewsData")
    .get(async (req, res) => {
        let interviews = await FetchInterviewsData();
        let applicants = await FetchApplicants()
        let result = {
            interviews: await interviews,
            applicants: await applicants
        }
        res.send(result);
        res.end();

    })

router
    .route("/fetchUpdatedInterviewers")
    .post(urlencodedParser, async (req, res) => {
        let result = await FetchUpdatedInterviewers(req.body.interview);
        res.send(result);
        res.end();

    })

router
    .route("/sendApplicantEmails")
    .post(urlencodedParser, async (req, res) => {
        await SendApplicantEmails(req.body);
       // confirmInterview(req.body)
        res.send('sent emails to applicants');
        res.end();

    })

router
    .route("/resendReminders")
    .post(async (req, res) => {
        console.log(req.body, 'req');
        SendReminders(req.body);
        res.send('sent reminders');
        res.end();

    })

router
    .route("/getRescheduleInterviewers")
    .post(urlencodedParser, async (req, res) => {
        let result = await GetRescheduleInterviewers(req.body);
        console.log(result, 'result');
        console.log('responce received from page');
        res.send(result);
        res.end();

    })

router
    .route("/assign")
    .post(urlencodedParser, async (req, res) => {

        await assignApplicant(req.body)
        await SendApplicantEmails(req.body);


        res.send('sent emails to applicants');
        res.end();

    })



module.exports = router;
