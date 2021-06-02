import React, { useEffect, useState } from "react";
import { Icon, Label, Modal, Popup, Statistic } from "semantic-ui-react";
import Schedule from "../InterviewsComponents/Schedule";

function ApplicantStats(props) {
  const { applicants,pendingApplicants } = props;
  const [viewPendingApplicants, setViewPendingApplicants] = useState(false);
  const [confirmedApplicants, setConfirmedApplicants] = useState([]);
  //const [pendingApplicants, setPendingApplicants] = useState(pendingApplicants);
  const [acceptedPendings, setAcceptedPendings] = useState([]);

  const updateContent = async () => {
    let confirmed = []; // already assigned to interviews
   // let pending = []; // require confirmation
    let tobeAssigned = []; // to be assigned to interviews
    applicants.forEach((applicant) => {
      switch (applicant.status) {
        case "accepted-pending":
          tobeAssigned.push(applicant);
          break;
        // case "pending":
        //   pending.push(applicant);
        //   break;
        case "confirmed":
          confirmed.push(applicant);
          break;
        default:
          console.log("none");
      }
    });
    setConfirmedApplicants(confirmed);
   // setPendingApplicants(pending);
    setAcceptedPendings(tobeAssigned);
  };

  useEffect(() => {
    updateContent();
  }, [applicants]);

  return (
    <>
      <div className="dashboardStatsContainer">
        <Label as="a" color="green" ribbon>
          Applicants
        </Label>
        <Statistic.Group
          className="applicantsStats dashboardStats"
          size="small"
        >
          <Popup
            content="Click here to view the pending Applicants"
            trigger={
              <a href="/hr/applicants">
                <Statistic
                  color={pendingApplicants.length === 0 ? "black" : "orange"}
                >
                  <Statistic.Value>
                    <Icon size="mini" name="user outline" />
                    {pendingApplicants.length}
                  </Statistic.Value>
                  <Statistic.Label>
                    Pending <br /> Applicants
                  </Statistic.Label>
                </Statistic>
              </a>
            }
          />
          <Popup
            content="Click here to assign the pending applicants to an interviews"
            trigger={
              // <a href="/hr/interviews/schedule">
              <Statistic
                color={acceptedPendings.length === 0 ? "black" : "orange"}
                onClick={() => setViewPendingApplicants(true)}
              >
                <Statistic.Value>
                  <Icon size="mini" name="user outline" />
                  {acceptedPendings.length}
                </Statistic.Value>
                <Statistic.Label>
                  not assigned <br /> to interviews
                </Statistic.Label>
              </Statistic>
              // </a>
            }
          />
          <Popup
            content="Confirmed Applicants"
            trigger={
              // <a href="/hr/interviews/schedule">
              <Statistic
                color={confirmedApplicants.length === 0 ? "black" : "green"}
              >
                <Statistic.Value>
                  <Icon size="mini" name="user outline" />
                  {confirmedApplicants.length}
                </Statistic.Value>
                <Statistic.Label>
                  Confirmed <br /> Applicants
                </Statistic.Label>
              </Statistic>
              // </a>
            }
          />
        </Statistic.Group>
        <Modal
          closeIcon={{
            style: { top: "1.0535rem", right: "1rem" },
            color: "black",
            name: "close",
          }}
          open={viewPendingApplicants}
          onClose={() => setViewPendingApplicants(false)}
          onOpen={() => setViewPendingApplicants(true)}
          size="large"
        >
          <Modal.Header>
            <h3>Pending Applicants</h3>
          </Modal.Header>
          <Modal.Content scrolling>
            <Schedule className="large" />
          </Modal.Content>
        </Modal>
      </div>
    </>
  );
}

export default ApplicantStats;
