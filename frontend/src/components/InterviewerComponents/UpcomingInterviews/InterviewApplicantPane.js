import React from "react";
import InterviewApplicantTab from "./InterviewApplicantTab";

function InterviewApplicantPane({ applicants }) {
  return (
    <>
      {applicants.map((applicant, i) => {
        return <InterviewApplicantTab applicant={applicant} />;
      })}
    </>
  );
}

export default InterviewApplicantPane;
