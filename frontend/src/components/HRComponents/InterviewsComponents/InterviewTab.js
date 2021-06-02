import axios from "axios";
import React, { Component } from "react";
import {
  Modal,
  Segment,
  Card,
  Button,
  Message,
  Confirm,
} from "semantic-ui-react";
import environment from "../../../environment.json";

class InterviewTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: new Array(this.props.applicant),
      interviewers: this.props.interview.Interviewers,
    };
    this.pending = false;
    this.notAvailable = false;
    this.interview = this.props.interview.Interview;
  }

  componentDidMount() {
    const { interview } = this.props;
    this.updateInterviewerState(interview.Interviewers);
  }

  updateInterviewerState(interviewers) {
    interviewers.forEach((interviewer) => {
      if (interviewer.state === "pending") {
        this.pending = true;
        return;
      } else if (interviewer.state === "not-available") {
        this.notAvailable = true;
        return;
      }
    });
    this.forceUpdate();
  }

  //***************************************************************************************************************** */
  assign() {
    const { assigned } = this.props;
    let sendRequest = () => {
      axios({
        method: "post",
        url: environment.baseUrl + "/interviews/assign",
        data: {
          interview: this.interview,
          applicants: this.state.applicant,
        },
      })
        .then((response) => {
          alert("successfully sent emails to applicants");
        })
        .catch((err) => {
          console.error(err);
          alert("something went wrong");
        });
    };
    if (this.pending || this.notAvailable) {
      if (
        window.confirm(
          "Are you sure you want to send emails to the applicants despite the pending interviewers"
        )
      ) {
        assigned();
        sendRequest();
      } else {
        console.log("wait till okay");
      }
    } else {
      sendRequest();
    }
  }
  //***************************************************************************************************** */
  /************************************************************************************************ */
  convertTime(time) {
    return new Date(0, 0, 0, ...time.split(":")).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  setModalState(state) {
    this.setState({
      reAssign: state,
    });
  }

  setReschedule(state) {
    this.setState({
      reSchedule: state,
    });
  }
  setReassigned(state) {
    this.setState({
      reAssigned: state,
    });
  }
  /*************************************************************************************************** */
  render() {
    const { interview } = this.props;
    let { Interview, Applicants } = interview;
    let Interviewers = this.state.interviewers;
    return (
      <>
        <Segment className="interviewDataForm" loading={!interview}>
          <p>Date: {new Date(Interview.int_date).toDateString()}</p>
          <p>
            Time: {this.convertTime(Interview.start_time)} to{" "}
            {this.convertTime(Interview.end_time)}{" "}
          </p>
          Interviewers:
          <ol>
            {Interviewers.map((interviewer) => {
              return (
                <li key={interviewer.interviewer_id}>
                  {interviewer.full_name} -{" "}
                  {interviewer.state === "not-available" ||
                  interviewer.state === "pending" ? (
                    <>
                      <a>
                        <span className="bad">{interviewer.state}</span>
                      </a>
                    </>
                  ) : (
                    <span className="good">{interviewer.state}</span>
                  )}
                </li>
              );
            })}
          </ol>
          <p>Number of Applicants : {Applicants.length}</p>
          <div>
            {
              //******************************* last options */
              this.pending || this.notAvailable ? (
                this.pending && !this.notAvailable ? ( //only pending
                  <>
                    <Message warning>
                      <p>
                        {" "}
                        <span className="bad">
                          Some Interviwers still havent responded to the hiring
                          portal.{" "}
                        </span>
                      </p>
                    </Message>
                  </>
                ) : (
                  //only not available
                  <>
                    <Message warning>
                      <p>
                        Some interviewers have stated that they are{" "}
                        <span className="bad">not available</span> on the given
                        date and time.
                      </p>
                    </Message>
                  </>
                )
              ) : (
                //all okay
                <>
                  <Message positive>
                    <p>
                      <span className="good">
                        All interviewers are available{" "}
                      </span>{" "}
                      for the intererview. <br />
                    </p>
                  </Message>
                </>
              )
            }
            <Button color="green" onClick={() => this.assign()}>
              Assign
            </Button>
          </div>
        </Segment>
      </>
    );
  }
}

export default InterviewTab;
