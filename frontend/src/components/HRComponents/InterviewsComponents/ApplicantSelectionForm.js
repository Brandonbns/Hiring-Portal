import React, { Component } from "react";
import axios from "axios";
import { convertToApplicantData } from "./Modules/convertToApplicantData";
import ApplicantsPane from "./ApplicantsPane";
import environment from "../../../environment.json";

export class ApplicantSelectionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingApplicants: [],
      scheduledApplicants: [],
    };
  }

  componentDidMount() {
    axios
      .get(environment.baseUrl + "/interviews/applicants")
      .then((response) => {
        this.setState({
          pendingApplicants: convertToApplicantData(response),
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  //to update state using the child component
  updateSelected(value) {
    const { changeState, getSelectedApplicants } = this.props;
    changeState(true);
    getSelectedApplicants(value);
    this.setState({
      scheduledApplicants: value,
    });
  }

  render() {
    const { disabled } = this.props;
    return (
      <div id="applicantSelectionForm">
        <ApplicantsPane
          applicants={this.state.pendingApplicants}
          updateSelected={this.updateSelected.bind(this)}
          disabled={disabled}
        />
      </div>
    );
  }
}

export default ApplicantSelectionForm;
