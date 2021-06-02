import React from "react";
import { Segment } from "semantic-ui-react";
import UpcomingInterviewTab from "./UpcomingInterviewTab";

function UpcomingInterviewPane({ upcoming, interviewerID }) {
  let date = new Date().getTime();
  let twoWeeksDate = new Date();
  twoWeeksDate = new Date(
    twoWeeksDate.setDate(twoWeeksDate.getDate() + 30)
  ).getTime();

  return (
    <Segment className="upcomingInterviewPane" loading={!upcoming}>
      <h3>Upcoming Interviews</h3>
      {upcoming
        ? upcoming.map((interview, i) => {
            return date < new Date(interview.Interview.int_date).getTime() &&
              new Date(interview.Interview.int_date).getTime() <
                twoWeeksDate ? (
              <UpcomingInterviewTab
                interview={interview}
                interviewerID={interviewerID}
              />
            ) : null;
          })
        : null}
    </Segment>
  );
}

export default UpcomingInterviewPane;
