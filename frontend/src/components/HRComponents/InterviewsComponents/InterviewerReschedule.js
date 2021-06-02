import React from "react";
import InterviewerReassignForm from "./InterviewerReassignForm";

function InterviewerReschedule(props) {
  const { interview, interviewers, pending, notAvailable, Confirm } = props;
  return (
    <div>
      <>
        <InterviewerReassignForm
          interview={interview}
          interviewers={interviewers}
          notAvailable={notAvailable}
        ></InterviewerReassignForm>
        <br />
        {pending.length >= interviewers.length / 2 ? (
          <p>
            Most of the interviewers Haven't responded to their Emails. Try
            Sending Reminders to them
          </p>
        ) : pending.length ? (
          <p>
            Some interviewers still haven't responded to the emails. Try
            resending <b>"Reminders"</b>
          </p>
        ) : null}
      </>
    </div>
  );
}

export default InterviewerReschedule;
