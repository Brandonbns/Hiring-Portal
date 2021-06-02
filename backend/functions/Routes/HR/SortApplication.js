const express = require("express");
let router = express.Router();

const bodyParser = require("body-parser");
const SortApplication = require("../../Models/HR/SortApplication/SortApplication");

var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(bodyParser.json());

router.route("/getjobs").get(urlencodedParser, SortApplication.getJobs);

router.route("/sortjob").post(urlencodedParser, SortApplication.sortJob);

router.route("/acceptapplicant").post(urlencodedParser, SortApplication.acceptApplicant);

router.route("/rejectapplicant").post(urlencodedParser, SortApplication.rejectApplicant);

module.exports = router;
