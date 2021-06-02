import React, { Component } from "react";
import ApplicantSelectionForm from "./ApplicantSelectionForm";
import { Modal } from "semantic-ui-react";

import InterviewerScheduleForm from "./InterviewerScheduleForm";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: "",
      formState: false,
      completed: false,
      selectedApplicants: [],
    };
  }

  changeState(value) {
    this.setState({
      formState: value,
    });
  }

  getSelectedApplicants(value) {
    this.setState({
      selectedApplicants: value,
    });
  }

  scheduleInterview = () => {
    this.setState({
      state: "schedule",
    });
  };

  setModalState(state) {
    this.setState({
      formState: state,
    });
  }

  setCompleted() {
    this.setState({
      completed: true,
      formState: false,
    });
  }

  render() {
    return (
      <>
        <div id="schedule" className="applicantForm">
          <ApplicantSelectionForm
            changeState={this.changeState.bind(this)}
            getSelectedApplicants={this.getSelectedApplicants.bind(this)}
            disabled={this.state.completed}
          />
        </div>
        <Modal
          closeIcon={{
            style: { top: "1.0535rem", right: "1rem" },
            color: "black",
            name: "close",
          }}
          className="re-assign-modal"
          onClose={() => {
            this.setModalState(false);
          }}
          onOpen={() => this.setModalState(true)}
          open={this.state.formState}
          size="tiny"
          closeOnDimmerClick={false}
          scrolling={false}
        >
          <Modal.Header>Schedule Interview</Modal.Header>
          <Modal.Content scrolling={false}>
            <InterviewerScheduleForm
              changeState={this.changeState.bind(this)}
              selectedApplicants={this.state.selectedApplicants}
              completed={this.setCompleted.bind(this)}
            />
          </Modal.Content>
          <Modal.Actions></Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default Schedule;
