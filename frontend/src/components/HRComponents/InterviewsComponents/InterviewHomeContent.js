import React, { useEffect, useState } from "react";
import { Message, Segment } from "semantic-ui-react";
import ConfirmedInterviewTab from "./ConfirmedInterviewTab";
import PendingConfirmationPane from "./PendingConfirmationPane";
import PendingInterviewTab from "./PendingInterviewTab";

function InterviewHomeContent({ stats }) {
  const { confirmed, confirmable } = stats;
  
  const [comingConfirmed, setComingConfirmed] = useState([]);
  const [comingConfimables, setcomingConfimables] = useState([]);
  let date = new Date().getTime();
  let twoWeeksDate = new Date();
  twoWeeksDate = new Date(
    twoWeeksDate.setDate(twoWeeksDate.getDate() + 30)
  ).getTime();

  useEffect(() => {
    if (confirmed) {
      confirmed.map((interview) => {
        if (
          date < new Date(interview.Interview.int_date).getTime() &&
          new Date(interview.Interview.int_date).getTime() < twoWeeksDate
        ) {
          setComingConfirmed((prevConfirmed) => [...prevConfirmed, interview]);
        }
      });
    }
  }, [confirmed]);

  useEffect(() => {
    if (confirmable) {
      confirmable.map((interview) => {
        if (date < new Date(interview.Interview.int_date).getTime()) {
          setcomingConfimables((prev) => [...prev, interview]);
        }
      });
    }
  }, [confirmable]);

  console.log(stats, "stats1");
  return (
    <div className="intHomeContentContainer">
      <Segment
        className="intHomeContent"
        loading={
          confirmed
            ? !confirmed.length
            : null || confirmable
            ? !confirmable.length
            : null
        }
      >
        <h3>Upcoming Interviews</h3>
        {comingConfirmed ? (
          comingConfirmed.length ? (
            comingConfirmed.map((interview, i) => {
              return (
                // (date < new Date(interview.Interview.int_date).getTime() && new Date(interview.Interview.int_date).getTime() < twoWeeksDate) ?
                <ConfirmedInterviewTab key={i} interview={interview} />
                //  :
                //  console.log(interview)
              );
            })
          ) : (
            <Message info>There are no confirmed interviews </Message>
          )
        ) : null}

        <h3>Pending Confirmations</h3>
        {comingConfimables ? (
          comingConfimables.length ? (
            <PendingConfirmationPane confirmable={comingConfimables} />
          ) : (
            <Message info>
              There are no pending interviews to be confirmed
            </Message>
          )
        ) : null}
      </Segment>
    </div>
  );
}

export default InterviewHomeContent;
