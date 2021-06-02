import axios from "axios";
import React, { Component } from "react";
import environment from "../../../environment.json";

import { Card, Button, Segment, Message } from "semantic-ui-react";
import PendingInterviewTab from "./PendingInterviewTab";

class Pending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingInterviews: "",
      interviewerID: this.props.interviewerID,
    };
  }

  async componentDidMount() {
    if (this.state.interviewerID) {
      axios({
        method: "post",
        url: environment.baseUrl + "/interviewer/pending",
        data: { interviewerID: this.state.interviewerID },
      })
        .then((Response) => {
          this.setState({
            pendingInterviews: Response.data,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <div className="pendingInterviewPane">
        <div className="pendingInterviewPaneHeader">
          <h3>Pending Interviews</h3>
        </div>
        <Segment
          className="pendingInterviewPaneContent"
          loading={!this.state.pendingInterviews}
        >
          {this.state.pendingInterviews.length ? (
            this.state.pendingInterviews.map((interview, i) => {
              {
                console.log(interview);
              }
              return (
                <>
                  <PendingInterviewTab
                    interview={interview}
                    count={i}
                    interviewerID={this.state.interviewerID}
                  />
                </>
              );
            })
          ) : (
            <Message positive>No pending Interviews</Message>
          )}
        </Segment>
        <div className="pendingInterviewActions">
          <Button content="Back"></Button>
        </div>
      </div>
    );
  }
}

export default Pending;
