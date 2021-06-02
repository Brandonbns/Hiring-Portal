import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Confirm,
  Icon,
  Modal,
  ModalContent,
  ModalHeader,
  Popup,
  Segment,
} from "semantic-ui-react";
import InterviewApplicantPane from "./InterviewApplicantPane";
import environment from "../../../environment.json";

function UpcomingInterviewTab({ interview, interviewerID }) {
  const { Applicants, Interview, Interviewers } = interview;
  const [displayApplicants, setDisplayApplicants] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  function convertTime(time) {
    return new Date(0, 0, 0, ...time.split(":")).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function stateUnavailable() {
    setUnavailable(false);
    setButtonDisabled(true);
    axios({
      method: "post",
      url: environment.baseUrl + "/interviewer/availability",
      data: {
        interviewID: Interview.interview_id,
        interviewerID: interviewerID,
        status: "not-available",
      },
    });
  }

  return (
    <>
      {
        <Segment className="confirmedInterviewTab">
          <p>
            Date: {new Date(Interview.int_date).toDateString()}
            <br />
            Time: {convertTime(Interview.start_time)} to{" "}
            {convertTime(Interview.end_time)} <br />
            Location: {Interview.location}
          </p>
          Interviewers:
          <ol>
            {Interviewers.length === 0 ? (
              <p>You are the only interviewer assigned to the interview</p>
            ) : (
              Interviewers.map((interviewer) => {
                return (
                  <li key={interviewer.interviewer_id}>
                    {interviewer.full_name}{" "}
                  </li>
                );
              })
            )}
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
          <br />
          <Popup
            content="State if you are unable to attend the interview"
            trigger={
              <Button
                secondary
                content="Unavailable"
                disabled={buttonDisabled}
                onClick={() => setUnavailable(true)}
              ></Button>
            }
          />
          <Confirm
            open={unavailable}
            content="Are you sure that you want mar unavailable to the interviews"
            onCancel={() => {
              setUnavailable(false);
            }}
            onConfirm={stateUnavailable}
          />
        </Segment>
      }
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

export default UpcomingInterviewTab;
