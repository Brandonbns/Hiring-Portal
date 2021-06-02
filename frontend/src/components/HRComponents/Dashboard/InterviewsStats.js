import React, { useEffect, useState } from "react";
import { Icon, Label, Modal, Popup, Statistic } from "semantic-ui-react";
import PendingConfirmationPane from "../InterviewsComponents/PendingConfirmationPane";
import Schedule from "../InterviewsComponents/Schedule";

function InterviewsStats(props) {
  const { applicants, interviews, updateStats } = props;
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
  const [viewConfirmable, setViewConfirmable] = useState(false);
  const [viewPendingApplicants, setViewPendingApplicants] = useState(false);

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

  useEffect(async () => {
    setUnavailavbleInts([]);
    setConfirmable([]);
    setPendings([]);
    try {
      await updateContent();
    } catch {}
  }, [interviews]);

  return (
    <div className="dashboardStatsContainer">
      <Label as="a" color="red" ribbon>
        Interviews
      </Label>
      <Statistic.Group className="interviewStats dashboardStats" size="small">
        <Popup
          content={
            "all interviewers are available in " +
            confirmable.length +
            " interviews. Send emails to the applicants and confirm them"
          }
          trigger={
            <Statistic color="green" onClick={() => setViewConfirmable(true)}>
              <Statistic.Value>
                <Icon size="mini" name="check circle outline" />
                {confirmable.length}
              </Statistic.Value>
              <Statistic.Label>
                Pending <br />
                Confirmations
              </Statistic.Label>
            </Statistic>
          }
        />
        <Popup
          content={
            unavailableInts.length +
            " Interviews have unavailable interviewers. Re assign new interviewers for them"
          }
          trigger={
            <a href="/hr/interviews/pendingInterviews">
              <Statistic color={unavailableInts.length === 0 ? "black" : "red"}>
                <Statistic.Value>
                  {unavailableInts.length === 0 ? null : (
                    <Icon size="mini" name="calendar times outline" />
                  )}
                  {unavailableInts.length}
                </Statistic.Value>
                <Statistic.Label>
                  with unavailable <br />
                  Interviewers
                </Statistic.Label>
              </Statistic>
            </a>
          }
        />
        <Popup
          content={
            pendingInterviews.length +
            " interviews are still pending. " +
            confirmable.length +
            " of them are confirmable. Please handle the issues with others"
          }
          trigger={
            <a href="/hr/interviews/pendingInterviews">
              <Statistic
                color={pendingInterviews.length != 0 ? "orange" : "black"}
              >
                <Statistic.Value>{pendingInterviews.length}</Statistic.Value>
                <Statistic.Label>
                  Pending
                  <br />
                  interviews
                </Statistic.Label>
              </Statistic>
            </a>
          }
        />
        <Popup
          content={
            confirmedInterviews.length + " Interviews are currently confirmed"
          }
          trigger={
            <Statistic color="blue">
              <Statistic.Value>
                <Icon size="mini" name="calendar check outline" />
                {confirmedInterviews.length}
              </Statistic.Value>
              <Statistic.Label>
                Confirmed
                <br />
                interviews
              </Statistic.Label>
            </Statistic>
          }
        />
      </Statistic.Group>
      <br></br>

      <Modal
        closeIcon={{
          style: { top: "1.0535rem", right: "1rem" },
          color: "black",
          name: "close",
        }}
        open={viewConfirmable}
        onClose={() => setViewConfirmable(false)}
        onOpen={() => setViewConfirmable(true)}
        size="large"
      >
        <Modal.Header>
          <h3>Pending Confirmations</h3>
        </Modal.Header>
        <Modal.Content scrolling>
          <PendingConfirmationPane confirmable={confirmable} />
        </Modal.Content>
      </Modal>

      <Modal
        closeIcon={{
          style: { top: "1.0535rem", right: "1rem" },
          color: "black",
          name: "close",
        }}
        open={viewPendingApplicants}
        onClose={() => setViewPendingApplicants(false)}
        onOpen={() => setViewPendingApplicants(true)}
        size="fullscreen"
      >
        <Modal.Header>
          <h3>Pending Applicants</h3>
        </Modal.Header>
        <Modal.Content scrolling>
          <Schedule />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default InterviewsStats;
