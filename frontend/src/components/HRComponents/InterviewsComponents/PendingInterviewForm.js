import React from "react";
import { Segment } from "semantic-ui-react";
import PendingInterviewTab from "./PendingInterviewTab";

function PendingInterviewForm(props) {
  const { PendingInterviews } = props;
  let date = new Date().getTime();
  return (
    <Segment id="PendingInterviewForm" loading={!PendingInterviews.data}>
      {PendingInterviews.data ? (
        PendingInterviews.data.map((interview, i) => (
          <>
            {date < new Date(interview.Interview.int_date).getTime() ? (
              <PendingInterviewTab key={i} interview={interview} />
            ) : null}
          </>
        ))
      ) : (
        <p>No Pending Interviews</p>
      )}
    </Segment>
  );
}

export default PendingInterviewForm;
