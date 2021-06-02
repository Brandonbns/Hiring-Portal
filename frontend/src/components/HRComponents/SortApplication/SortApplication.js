/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import environment from "../../../environment.json";
import { Button, Modal } from "semantic-ui-react";

function SortApplication() {
  const [viewApplicant, setViewApplicant] = useState(false);
  const [jobOpportunities, setJobOpportunities] = useState([]);
  const [applicant, setApplicant] = useState({});
  const [selectedJob, setSelectedJob] = useState();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(environment.baseUrl + "/sortapplication/getjobs")
      .then((response) => {
        setJobOpportunities(response.data);
        setSelectedJob(response.data[0].job_id);
      });
  }, []);

  const sort = () => {
    axios
      .post(environment.baseUrl + "/sortapplication/sortjob", {
        selectedJob,
      })
      .then((response) => {
        setApplications(response.data);
      });
  };

  function confirmApplicant(id,job) {
    axios({
      method: "POST",
      url: environment.baseUrl + "/sortapplication/acceptapplicant",
      data: {
        id:id,
        job:job
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function rejectApplicant(id,job) {
    axios({
      method: "POST",
      url: environment.baseUrl + "/sortapplication/rejectapplicant",
      data: {
        id:id,
        job:job
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 pt-5">
          <div className="form-group">
            <h5 className="card-title">
              <label htmlFor="job_opportunity">Job Opportunity</label>
            </h5>

            <select
              name="job_opportunity"
              id="job_opportunity"
              className="form-control"
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              {jobOpportunities.map((job) => (
                <option value={job.job_id} key={job.job_id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="btn btn-danger mt-5" onClick={sort}>
            Sort
          </button>
        </div>

        <div className="col-6 pt-5 disable-overflow">
          {applications.map((application, index) => (
            <div className="card m-2" key={index}>
              <div className="card-body">
                <h5 className="card-title">
                  {application.f_name + " " + application.l_name}
                </h5>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setViewApplicant(true);
                    setApplicant(application);
                  }}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={viewApplicant}
        onClose={() => setViewApplicant(false)}
        onOpen={() => setViewApplicant(true)}
        closeIcon={{
          style: { top: "1.0535rem", right: "1rem" },
          color: "black",
          name: "close",
        }}
      >
        {console.log(applicant, "applicant")}
        <Modal.Header>
          <h3>{applicant.f_name + " " + applicant.l_name}</h3>
        </Modal.Header>
        <Modal.Content>
          <p>Gender:{applicant.gender}</p>
          <p>{applicant.bio}</p>
          Skills :
          {applicant.skills
            ? applicant.skills.split(",").map((skill) => {
                return <li key={skill}>{skill.trim()}</li>;
              })
            : null}
          <br></br>
          <a href={applicant.cv_url} target='_blank'><Button content="View CV"/></a>
          <Button
            color="green"
            content="Accept"
            onClick={() => confirmApplicant(applicant.applicant_id,selectedJob)}
          ></Button>
          <Button
            color="red"
            content="Reject"
            onClick={() => rejectApplicant(applicant.applicant_id,selectedJob)}
          ></Button>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default SortApplication;
