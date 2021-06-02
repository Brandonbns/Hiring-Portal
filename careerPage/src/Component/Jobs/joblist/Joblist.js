import React, { Component } from "react";
import "./Joblist.css";
import Joblistitem from "../Joblistitem/Joblistitem";
import connect from "react-redux/es/connect/connect";
import env from "../../../config/env.json";
class Joblist extends Component {
  state = {
    jobs: [],
    error: false,
  };

  componentDidMount() {
    fetch(
      env.baseUrl +
        "/applicant/applicantjobs/get-applied-jobs/" +
        this.props.applicant_id
    )
      .then((res) => res.json())
      .then((job) => this.setState({ jobs: job.data }))
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  render() {
    // console.log(this.state.jobs)
    let jobitem = (
      <div>
        {this.state.jobs.map((job) => {
          return (
            <Joblistitem
              key={job.id}
              id={job.id}
              name={job.job.title}
              status={job.status}
              created_at={job.created_at}
            />
          );
        })}
      </div>
    );
    return (
      <div>
        <div className="container  border border-light">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">{jobitem}</div>

            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    applicant_id: state.hp_userpanel_reducer.applicant_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Joblist);
