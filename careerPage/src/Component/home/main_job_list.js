import React, { Component } from "react";
import "./main_job_list.css";
import Job_list_item from "../home/job-list-item/Job-list-item";
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import env from "../../environment.json"

class main_job_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      appliedJobs: [],
      error: false,
    };
  }

  componentDidMount() {
    fetch(env.baseUrl+"/applicant/jobs")
      .then((res) => res.json())
      .then(
        (
          job //jobarray
        ) => this.setState({ jobs: job.data })
      )
      .catch((error) => {
        this.setState({ error: true });
      });

    axios
      .post(env.baseUrl+"/applicant/applicantjobs/search", {
        applicant_id: this.props.applicant_id, //get applied jobs from appiant id
      })
      .then((job) => {
        //console.log(job.data.data)
        const appliedJobs = [];
        job.data.data.map((element) => {
          appliedJobs.push(element.job_id);
        });
        console.log(appliedJobs);
        this.setState({ appliedJobs: appliedJobs });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  render() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!              //inbuild functions
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = yyyy + "-" + mm + "-" + dd;
    // console.log(today);

    //
    // const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // // Discard the time and time-zone information.
    //   today  = Date.UTC(today.getFullYear(),today.getMonth(), today.getDate());

    let jobitem = (
      <div>
        {this.state.jobs != undefined && //check the result is available or not
          this.state.jobs.map((job) => {
            if (this.props.isAuthenticated && today > job.deadline) {
              //check login and date
              if (!this.state.appliedJobs.includes(job.id)) {
                //check that job id include in the appliedjobs and doesnt show applied jobs
                return (
                  <Job_list_item
                    key={job.id}
                    id={job.id}
                    name={job.title}
                    salary={job.salary}
                    deadline={job.deadline}
                    description={job.description}
                    skills={job.skills}
                    time={job.time}
                  />
                );
              }
            } else if (today > job.deadline) {
              return (
                <Job_list_item
                  key={job.id}
                  id={job.id}
                  name={job.title}
                  salary={job.salary}
                  deadline={job.deadline}
                  description={job.description}
                  skills={job.skills}
                  time={job.time}
                />
              );
            }
          })}
      </div>
    );
    return (
      <div>
        <br />
        <div className="container home-heigth">
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-10">{jobitem}</div>

            <div className="col-sm-1"></div>
          </div>
        </div>

        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    applicant_id: state.auth.userId,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(main_job_list);
