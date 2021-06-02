import React, { Component } from "react";
import { Card, Button, Segment } from "semantic-ui-react";
import ApplicantTab from "./ApplicantTab";

export class ApplicantsPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedApplicants: [],
    };
  }

  handleCancel(applicant) {
    var arr = this.state.selectedApplicants;
    arr = arr.filter((item) => item !== applicant.applicant_id);
    this.setState({
      selectedApplicants: arr,
    });
  }

  handleSchedule(applicant) {
    var arr = this.state.selectedApplicants;
    arr.push(applicant.applicant_id);
    this.setState({
      selectedApplicants: arr,
    });
  }

  render() {
    const { applicants, disabled } = this.props;
    return (
      <div className="ApplicantsPane ">
        <div className="ApplicantsPaneHeader">
          <h3>Pending Applicants</h3>
        </div>
        <Segment
          className="ApplicantsPaneContent d-flex justify-content-center"
          loading={!applicants.length}
        >
          <Card.Group>
            {applicants.map((applicant) => {
              return (
                <ApplicantTab
                  key={applicant.applicant_id}
                  applicant={applicant}
                  handleSchedule={() => this.handleSchedule(applicant)}
                  handleCancel={() => this.handleCancel(applicant)}
                  disabled={disabled}
                />
              );
            })}
          </Card.Group>
        </Segment>
        <div className="ApplicantsPaneAction">
          <Button
            primary
            onClick={() => {
              this.props.updateSelected(this.state.selectedApplicants);
            }}
            disabled={disabled}
          >
            Schedule new Interview
          </Button>
        </div>
      </div>
    );
  }
}

export default ApplicantsPane;
