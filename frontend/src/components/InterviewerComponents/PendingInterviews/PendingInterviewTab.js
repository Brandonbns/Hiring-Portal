import axios from "axios";
import { React, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import environment from "../../../environment.json";

function PendingInterviewTab(props) {
  const { interview, count, interviewerID } = props;
  console.log(interview, "tab");
  const [availability, setAvailability] = useState(false);
  const updateAvailability = (interviewerID, interview, status) => {
    setAvailability(status);
    console.log(availability, "availability");
    console.log(interviewerID, interview, status);
    axios({
      method: "post",
      url: environment.baseUrl + "/interviewer/availability",
      data: {
        interviewID: interview,
        interviewerID: interviewerID,
        status: status,
      },
    })
      .then((Response) => console.log(Response))
      .catch((err) => console.error(err));
  };

  return (
    <Segment className="pendingInterview">
      <h4>Interview # {count}</h4>
      <p>
        Date : {new Date(interview.int_date).toDateString()}
        <br />
        Time : {interview.start_time} - {interview.end_time}
        <br />
        Location : {interview.location}
      </p>
      <Button
        primary
        id="interviewerConfirm"
        disabled={availability === "available" ? true : false}
        onClick={() => {
          updateAvailability(
            interviewerID,
            interview.interview_id,
            "available"
          );
        }}
      >
        Confirm
      </Button>
      <Button
        secondary
        id="interviewerDecline"
        disabled={availability === "not-available" ? true : false}
        onClick={() => {
          updateAvailability(
            interviewerID,
            interview.interview_id,
            "not-available"
          );
        }}
      >
        Not available
      </Button>
      <br></br>
    </Segment>
  );
}

export default PendingInterviewTab;
