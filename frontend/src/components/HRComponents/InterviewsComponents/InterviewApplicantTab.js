import React from "react";
import { Button, Segment } from "semantic-ui-react";

function InterviewApplicantTab({ applicant }) {
  console.log(applicant, "======================");
  return (
    <Segment className="interviewApplicantTab">
      <div className="interviewApplicantTabContent">
        <img
          src={applicant.img_url || "http://via.placeholder.com/100"}
          width="70px"
          height="70px"
          className="float-left round"
        ></img>
        <h3>{applicant.f_name + applicant.l_name}</h3>

        <p>{applicant.description}</p>
        <br />

        <p>
          <b>Work Experience:</b> {applicant.work_experience} years
        </p>
        <b>Skills :</b>
        {applicant.skills
          ? applicant.skills.split(",").map((skill) => {
              return <li key={skill}>{skill.trim()}</li>;
            })
          : null}
        <a href={applicant.cv_url} target="_blank">
          {" "}
          <Button color="primary" className="float-right">
            View CV
          </Button>
        </a>
      </div>
    </Segment>
  );
}

export default InterviewApplicantTab;
