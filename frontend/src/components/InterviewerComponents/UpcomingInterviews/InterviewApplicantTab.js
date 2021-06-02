import React from "react";
import { Button, Segment } from "semantic-ui-react";

function InterviewApplicantTab({ applicant }) {
  console.log(applicant, "applicantr");
  return (
    <Segment className="interviewApplicantTab">
      <div className="interviewApplicantTabContent">
        {applicant.f_name + applicant.l_name}
        <Button className="cvbtn" content="View CV"></Button>
      </div>
    </Segment>
  );
}

export default InterviewApplicantTab;
