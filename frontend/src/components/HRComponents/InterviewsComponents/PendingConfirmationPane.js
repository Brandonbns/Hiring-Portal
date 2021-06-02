import React from "react";
import PendingInterviewTab from "./PendingInterviewTab";

function PendingConfirmationPane({ confirmable }) {
  let date = new Date().getTime();
  return (
    <div>
      {confirmable.map((interview, i) => {
        if (date < new Date(interview.Interview.int_date).getTime()) {
          return <PendingInterviewTab key={i} interview={interview} />;
        }
      })}
    </div>
  );
}

export default PendingConfirmationPane;
