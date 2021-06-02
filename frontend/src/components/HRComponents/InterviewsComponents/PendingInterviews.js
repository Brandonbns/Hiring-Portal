import axios from "axios";
import React, { Component } from "react";
import PendingInterviewForm from "./PendingInterviewForm";
import environment from "../../../environment.json";

class PendingInterviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PendingInterviews: [],
    };
  }

  async componentDidMount() {
    try {
      var result = await axios.get(
        environment.baseUrl + "/interviews/pendingInterviews"
      );
      this.setState({
        PendingInterviews: result,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div id="pendingInterviews">
        <div className="pendingInterviewHeader">
          <a className="noStyleLink" href="/hr/interviews/pendingInterviews">
            {" "}
            <h3>Pending Interviews</h3>
          </a>
        </div>
        <PendingInterviewForm
          PendingInterviews={this.state.PendingInterviews}
        />
      </div>
    );
  }
}

export default PendingInterviews;
