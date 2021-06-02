const FetchApplicantsData = require("../../Models/HR/Dashboard/FetchApplicantsData");
const {
  FetchInterviewsData,
} = require("../../Models/HR/Dashboard/FetchInterviewData");
const FetchInterviewerData = require("../../Models/HR/Dashboard/FetchInterviewerData");
const { FetchJobsData } = require("../../Models/HR/Dashboard/FetchJobsData");
const FetchPendingApplicants = require("../../Models/HR/Dashboard/FetchPendingApplicants");

const getInterviewData = async (req, res) => {
  let result = FetchInterviewsData();
  return result;
};

const getInterviewerData = async (req, res) => {
  let result = FetchInterviewerData();
  return result;
};

const getApplicantData = async (req, res) => {
  let result = FetchApplicantsData();
  return result;
};

const getJobData = async (req, res) => {
  let result = FetchJobsData();
  return result;
};

const getPendingApplicants = async (req, res) => {
  let result = FetchPendingApplicants();
  return result;
};

exports.getData = async (req, res) => {
  let interviews = await getInterviewData();
  let applicants = await getApplicantData();
  let interviewers = await getInterviewerData();
  let jobs = await getJobData();
  let pendingApplicants = await getPendingApplicants();

  let data = {
    Interviews: interviews,
    Applicants: applicants,
    Interviewers: interviewers,
    Jobs: jobs,
    PendingApplicants :pendingApplicants
  };
  res.send(data);
};
