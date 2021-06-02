import axios from "axios";
import React, { Component } from "react";
import { Modal, Segment, Button, Message, Confirm } from "semantic-ui-react";
import environment from "../../../environment.json";

import InterviewerRescheduleForm from "./InterviewerRescheduleForm";
import InterviewerReassignForm from "./InterviewerReassignForm";

class PendingInterviewTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reAssign: false,
      reAssigned: false,
      reSchedule: false,
      updated: false,
      interviewers: this.props.interview.Interviewers,
      resend: false,
      sentReminders: false,
      confirmed: false,
    };

    this.pending = false;
    this.notAvailable = false;
    this.pendingInterviewers = [];
    this.notAvailableInterviewers = [];
    this.interview = this.props.interview.Interview;
  }

  componentDidMount() {
    const { interview } = this.props;
    this.updateInterviewerState(interview.Interviewers);
  }

  resetInterviewers() {
    this.pending = false;
    this.notAvailable = false;
    this.pendingInterviewers = [];
    this.notAvailableInterviewers = [];
  }

  updateInterviewerState(interviewers) {
    this.resetInterviewers();
    interviewers.forEach((interviewer) => {
      if (interviewer.state === "pending") {
        this.pendingInterviewers.push(interviewer);
        this.pending = true;
        return;
      } else if (interviewer.state === "not-available") {
        this.notAvailableInterviewers.push(interviewer);
        this.notAvailable = true;
        return;
      }
    });
    this.forceUpdate();
  }

  //***************************************************************************************************************** */
  sendEmailsToApplicants(applicants) {
    let sendRequest = () => {
      axios({
        method: "post",
        url: environment.baseUrl + "/interviews/sendApplicantEmails",
        data: {
          interview: this.interview,
          applicants: applicants,
        },
      })
        .then((response) => {
          alert("successfully sent emails to applicants");
          this.setState({
            confirmed: true,
          });
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
        sendRequest();
      } else {
        console.log("wait till okay");
      }
    } else {
      sendRequest();
    }
  }

  //***************************************************************************************************** */

  resendReminders() {
    this.setState({ sentReminders: true });
    axios({
      method: "post",
      url: environment.baseUrl + "/interviews/resendReminders",
      data: {
        interview: this.interview,
        interviewers: this.pendingInterviewers,
      },
    })
      .then((response) => {
        alert("successfully sent reminders to interviewers");
      })
      .catch((err) => {
        console.error(err);
        alert("something went wrong");
      });
  }

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

  async fetchUpdated() {
    try {
      var result = await axios({
        method: "post",
        url: environment.baseUrl + "/interviews/fetchUpdatedInterviewers",
        data: { interview: this.interview },
      });
      this.updateInterviewerState(result.data.Interviewers);
      this.setState({
        updated: true,
        interviewers: await result.data.Interviewers,
      });
    } catch (err) {
      console.log(err);
    }
  }

  /*************************************************************************************************** */

  render() {
    const { interview } = this.props;
    let { Interview, Applicants } = interview;
    let Interviewers = this.state.interviewers;
    const fetchUpdated = this.fetchUpdated.bind(this);

    return (
      <>
        <Segment className="interviewDataForm">
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
                        Click <b>'Resend Reminders'</b> to resend emails to
                        them. <br />
                        If you want to send emails to the applicants anyway.
                        Click <b>'Send Emails to Applicants'</b>
                      </p>
                    </Message>
                    <Button
                      primary
                      disabled={this.state.sentReminders}
                      onClick={() => this.setState({ resend: true })}
                    >
                      Resend Reminders
                    </Button>
                    <Confirm
                      open={this.state.resend}
                      content="Are you sure that you want to send Reminders?"
                      onCancel={() => {
                        this.setState({ resend: false });
                      }}
                      onConfirm={() => {
                        this.resendReminders();
                        this.setState({ resend: false });
                      }}
                    />
                  </>
                ) : (
                  //only not available
                  <>
                    <Message warning>
                      <p>
                        Some interviewers have stated that they are{" "}
                        <span className="bad">not available</span> on the given
                        date and time. Click <b>'Re-Assign</b> to assign new
                        interviewers for the panel. <br />
                        If you want to send emails to the applicants anyway.
                        Click <b>'Send Emails to Applicants'</b>{" "}
                      </p>
                    </Message>
                    <Button primary onClick={() => this.setModalState(true)}>
                      Re-Assign
                    </Button>
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
                      Click <b>'Send Emails to Applicants' </b> to send emails
                      and confirm the interview
                    </p>
                  </Message>
                </>
              )
              // <p>pending</p> : <p>not</p>
            }
            <Button
              color={this.pending || this.notAvailable ? "orange" : "green"}
              onClick={() => this.sendEmailsToApplicants(Applicants)}
              disabled={this.state.confirmed}
            >
              Send Emails to Applicants
            </Button>
          </div>
          <div className="reassign">
            <Modal
              className="re-assign-modal"
              onClose={() => {
                this.setModalState(false);
                this.setReschedule(false);
              }}
              onOpen={() => this.setModalState(true)}
              open={this.state.reAssign}
              size="tiny"
              scrolling={false}
              closeIcon
            >
              <Modal.Header>Re-Assign Interviewers</Modal.Header>
              <Modal.Content scrolling={false}>
                {this.state.reSchedule ? (
                  <InterviewerRescheduleForm
                    interview={Interview}
                  ></InterviewerRescheduleForm>
                ) : (
                  <>
                    <InterviewerReassignForm
                      interview={Interview}
                      interviewers={Interviewers}
                      pending={this.pendingInterviewers}
                      notAvailable={this.notAvailableInterviewers}
                    >
                      {" "}
                    </InterviewerReassignForm>
                    <br />
                    {this.pendingInterviewers.length >=
                    Interviewers.length / 2 ? (
                      <p>
                        Most of the interviewers Haven't responded to their
                        Emails. Try Sending Reminders to them
                      </p>
                    ) : this.pendingInterviewers.length ? (
                      <p>
                        Some interviewers still haven't responded to the emails.
                        Try resending <b>"Reminders"</b>
                      </p>
                    ) : null}
                  </>
                )}
              </Modal.Content>
              <Modal.Actions>
                <>
                  {this.pending && !this.state.reSchedule ? (
                    <Button
                      inverted
                      color="orange"
                      onClick={() => {
                        this.resendReminders();
                      }}
                    >
                      Resend Reminders
                    </Button>
                  ) : null}
                  {this.notAvailableInterviewers.length ? (
                    <Button
                      inverted
                      color="orange"
                      onClick={() => {
                        this.setReschedule(true);
                      }}
                    >
                      Reschedule
                    </Button>
                  ) : null}
                  <Button
                    inverted
                    color="orange"
                    onClick={() => {
                      this.setModalState(false);
                      this.setReschedule(false);
                      this.setReassigned(true);
                      fetchUpdated();
                    }}
                  >
                    Okay
                  </Button>
                </>
              </Modal.Actions>
            </Modal>
          </div>
        </Segment>
      </>
    );
  }
}

export default PendingInterviewTab;
