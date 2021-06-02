import React from "react";
import ApplicantStats from "./ApplicantStats";
import InterviewerStats from "./InterviewerStats";
import InterviewsStats from "./InterviewsStats";
import JobStats from "./JobStats";

function DashboardStats(props) {
  const { applicants, interviews, jobs, pendingApplicants } = props.states;

  return (
    <div className="dashboardStats">
      <div className="topLeft padding1 equal ">
        <ApplicantStats applicants={applicants} pendingApplicants={pendingApplicants} interviews={interviews} />
      </div>
      <div className="topRight  padding1 equal ">
        <InterviewsStats applicants={applicants} interviews={interviews} />
      </div>
      <div className="bottomLeft padding1 equal ">
        <InterviewerStats applicants={applicants} interviews={interviews} />
      </div>
      <div className="bottomRight padding1 equal ">
        <JobStats applicants={applicants} interviews={interviews} jobs={jobs} />
      </div>
    </div>
  );
}

export default DashboardStats;
