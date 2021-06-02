import React, { useEffect, useState } from "react";
import { Icon, Label, Popup, Statistic } from "semantic-ui-react";

function InterviewerStats(props) {
  const { interviews } = props;
  const pendingInterviews = interviews.filter(
    (interview) => interview.Interview.state === "pending"
  );
  const confirmedInterviews = interviews.filter(
    (interview) => interview.Interview.state === "confirmed"
  );
  const [confirmable, setConfirmable] = useState([]); //interviews where wverything is okay
  const [pendings, setPendings] = useState([]); //interviews with all interviewers pending
  const [unavailableInts, setUnavailavbleInts] = useState([]); // interviews with
  const [pendingInterviewers, setPendingInterviewers] = useState(0);
  const [unavailableInterviewers, setUnavailableInterviewers] = useState(0);

  const interviewersStateReducer = (accumilator, currentItem) => {
    switch (currentItem.state) {
      case "pending": {
        return accumilator * 2;
      }
      case "not-available": {
        return accumilator * 0;
      }
      case "available": {
        return accumilator * 1;
      }
      default:break;
    }
  };

  const updateContent = async () => {
    let notAvailable = [];
    let pending = [];
    pendingInterviews.map(async (interview) => {
      pending.push(
        interview.Interviewers.reduce((tot, interviewer) => {
          if (interviewer.state === "pending") return tot + 1;
          else return tot + 0;
        }, 0)
      );
      notAvailable.push(
        interview.Interviewers.reduce((tot, interviewer) => {
          if (interviewer.state === "not-available") return tot + 1;
          else return tot + 0;
        }, 0)
      );
      let stateRes = await interview.Interviewers.reduce(
        interviewersStateReducer,
        1
      );
      switch (stateRes) {
        case 0:
          await setUnavailavbleInts((prevUnavailableInts) => [
            ...prevUnavailableInts,
            interview,
          ]);
          break;
        case 1:
          await setConfirmable((prevConfirmable) => [
            ...prevConfirmable,
            interview,
          ]);
          break;
        default:
          await setPendings((prevPendings) => [...prevPendings, interview]);
          break;
      }
    });
    setUnavailableInterviewers(
      notAvailable.reduce((accumilator, currentItem) => {
        return accumilator + currentItem;
      }, 0)
    );
    setPendingInterviewers(
      pending.reduce((accumilator, currentItem) => {
        return accumilator + currentItem;
      }, 0)
    );
  };

  useEffect( () => {
    async function SetData(){
      setUnavailavbleInts([]);
    setConfirmable([]);
    setPendings([]);
    try {
      await updateContent();
    } catch {}
    }
    SetData();
    
  }, [interviews]);

  return (
    <div className="dashboardStatsContainer">
      <Label as="a" color="blue" ribbon>
        Interviews
      </Label>
      <Statistic.Group className="interviewerStats dashboardStats" size="small">
        <Popup
          content={
            unavailableInterviewers +
            " Interviewers have stated they are not available on their assigned interviews. Re assign new interviewers for them"
          }
          trigger={
            <a href="/hr/interviews/pendingInterviews">
              <Statistic color={unavailableInterviewers ? "red" : "black"}>
                <Statistic.Value>
                  {unavailableInterviewers ? (
                    <Icon size="mini" name="calendar times outline" />
                  ) : null}
                  {unavailableInterviewers}
                </Statistic.Value>
                <Statistic.Label>
                  unavailable
                  <br />
                  interviewers
                </Statistic.Label>
              </Statistic>
            </a>
          }
        />
        <Popup
          content={
            pendingInterviewers +
            " Interviewers still haven't responded to their emails. Please send reminders to them"
          }
          trigger={
            <Statistic color={pendingInterviewers ? "orange" : "black"}>
              <Statistic.Value>
                {pendingInterviewers ? (
                  <Icon size="mini" name="hourglass half" />
                ) : null}
                {pendingInterviewers}
              </Statistic.Value>
              <Statistic.Label>
                Pending
                <br />
                interviewers
              </Statistic.Label>
            </Statistic>
          }
        />
      </Statistic.Group>
    </div>
  );
}

export default InterviewerStats;
