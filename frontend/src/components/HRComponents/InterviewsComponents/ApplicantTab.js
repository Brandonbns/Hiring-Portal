import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, Segment, Card, Button, Icon, Popup } from "semantic-ui-react";
import InterviewForm from "./InterviewForm";

function ApplicantTab(props) {
  const { applicant, handleSchedule, handleCancel, disabled } = props;
  const [scheduled, setScheduled] = useState(false);
  const [open, setOpen] = useState(false);
  const [assign, setAssign] = useState(false);
  const [assigned, setAssigned] = useState(false);

  const notifyConfirm = (applicantName) => {
    alert(
      `${applicantName} was confirmed and waiting to be assigned to an interview`
    );
  };

  function confirmAssign() {
    setAssigned(true);
    setAssign(false);
  }

  return (
    <>
      {console.log(applicant)}
      <Card className="applicantCard">
        <Card.Header>
          <h3>{applicant.name}</h3>
        </Card.Header>
        <Card.Content className="applicantTabContent">
          <p>
            <b>Applied Jobs:</b>{" "}
            {applicant.jobs
              ? applicant.jobs.map((job) => job.title).join(" , ")
              : null}{" "}
          </p>
          <p>
            <b>Work Experience:</b> {applicant.work_experience} years
          </p>
          <p>
            {" "}
            <b>Skills :</b>{" "}
            {applicant.skills ? applicant.skills.join(" , ") : null}
          </p>
          <br />
          <div className="float-bottom">
            <Popup
              content="view more information about the applicant"
              trigger={
                <a>
                  {" "}
                  <p className="applicantInfo " onClick={() => setOpen(true)}>
                    <Icon name="info circle" />
                    more info...
                  </p>
                </a>
              }
            />
          </div>
        </Card.Content>
        <Card.Content className="applicantTabActions">
          {!scheduled ? (
            <>
              <Popup
                content="Confirm applicant and assign to the new interview"
                trigger={
                  <Button
                    inverted
                    color="green"
                    content="Confirm"
                    icon="check"
                    labelPosition="right"
                    disabled={disabled}
                    value="confirm"
                    onClick={() => {
                      handleSchedule();
                      setScheduled((current) => !current);
                      notifyConfirm(applicant.name);
                    }}
                  />
                }
              />
            </>
          ) : (
            <>
              <Button
                inverted
                color="red"
                icon="cancel"
                content="Cancel"
                labelPosition="right"
                onClick={() => {
                  handleCancel();
                  setScheduled((current) => !current);
                }}
                disabled={disabled || assigned}
              />
              <Popup
                content="Assign to a currently scheduled interview"
                trigger={
                  <Button
                    inverted
                    color="green"
                    icon="angle double right"
                    content="Assign"
                    labelPosition="right"
                    onClick={() => {
                      handleCancel();
                      setAssign(true);
                    }}
                    disabled={disabled || assigned}
                  />
                }
              />
            </>
          )}
        </Card.Content>
      </Card>
      <Modal
        className="infoModal"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        closeIcon={{
          style: { top: "1.0535rem", right: "1rem" },
          color: "black",
          name: "close",
        }}
      >
        <Modal.Content className="fit-content">
          <img
            src={applicant.image || "http://via.placeholder.com/100"}
            width="70px"
            height="70px"
            className="float-right round"
          ></img>
        </Modal.Content>
        <Modal.Header>
          <h3>{applicant.name}</h3>
        </Modal.Header>
        <Modal.Content>
          <p>{applicant.description}</p>
          <br />
          <p>
            <b>Applied Jobs:</b>{" "}
          </p>
          <p>
            <b>Work Experience:</b> {applicant.work_experience} years
          </p>
          <b>Skills :</b>
          {applicant.skills
            ? applicant.skills.map((skill) => {
                return <li key={skill}>{skill.trim()}</li>;
              })
            : null}
          <a href={applicant.cv} target="_blank">
            {" "}
            <Button color="primary" className="float-right">
              View CV
            </Button>
          </a>
        </Modal.Content>
      </Modal>
      <Modal
        closeIcon={{
          style: { top: "1.0535rem", right: "1rem" },
          color: "black",
          name: "close",
        }}
        open={assign}
        onClose={() => setAssign(false)}
        onOpen={() => setAssign(true)}
        size="large"
      >
        <Modal.Header>
          <h3>Assign Applicant to a currently scheduled interview</h3>
        </Modal.Header>
        <Modal.Content>
          <InterviewForm applicant={applicant} assigned={confirmAssign} />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ApplicantTab;
