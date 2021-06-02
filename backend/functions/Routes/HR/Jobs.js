const express = require("express");
let router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});
var JobsController = require("../../Controllers/Jobs/jobControlller");


router.post("/jobs", urlencodedParser, (req, res) => JobsController.InsertJob(req, res));

router.get("/getjobs",urlencodedParser,(req,res)=>JobsController.GetJobs(req,res));

router.get("/getpendingjobs", urlencodedParser, (req, res) => JobsController.GetPendingJobs(req, res));

router.put("/editjobs",urlencodedParser,(req,res)=>JobsController.EditJob(req,res));

router.post("/deletejobs",urlencodedParser,(req,res)=>JobsController.DeleteJob(req,res));


module.exports = router;