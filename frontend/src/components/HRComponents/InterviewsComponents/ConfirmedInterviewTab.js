import React, { useState } from "react";
import {
  Icon,
  Modal,
  ModalContent,
  ModalHeader,
  Popup,
  Segment,
} from "semantic-ui-react";
import InterviewApplicantPane from "./InterviewApplicantPane";

function ConfirmedInterviewTab({ interview }) {
  console.log(interview, "interview");
  const { Applicants, Interview, Interviewers } = interview;
  const [displayApplicants, setDisplayApplicants] = useState(false);

  function convertTime(time) {
    return new Date(0, 0, 0, ...time.split(":")).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      {Interview ? (
        <Segment className="confirmedInterviewTab">
          <p>Date: {new Date(Interview.int_date).toDateString()}</p>
          <p>
            Time: {convertTime(Interview.start_time)} to{" "}
            {convertTime(Interview.end_time)}{" "}
          </p>
          Interviewers:
          <ol>
            {Interviewers.map((interviewer) => {
              return (
                <li key={interviewer.interviewer_id}>
                  {interviewer.full_name}{" "}
                </li>
              );
            })}
          </ol>
          <Popup
            content="view more information about the applicants"
            trigger={
              <a>
                {" "}
                <p
                  className="applicantInfo"
                  onClick={() => setDisplayApplicants(true)}
                >
                  <Icon name="info circle" />
                  Number of Applicants : {Applicants.length}
                </p>
              </a>
            }
          />
        </Segment>
      ) : null}
      <Modal
        open={displayApplicants}
        onClose={() => setDisplayApplicants(false)}
        onOpen={() => setDisplayApplicants(true)}
      >
        <ModalHeader>Applicants</ModalHeader>
        <ModalContent>
          <InterviewApplicantPane applicants={Applicants} />
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmedInterviewTab;
