import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Modal, Popup, Statistic } from "semantic-ui-react";

function JobStats(props) {
  const { applicants, jobs } = props;
  const [open, setOpen] = useState([]);
  const [closed, setClosed] = useState([]);
  const [pending, setPending] = useState([]);

  const updateContent = async () => {
    let openJobs = [];
    let closeJobs = [];
    let pendingJobs = [];
    console.log(jobs,'jobs');
    jobs.map((job) => {
      switch (job.Job.job_status) {
        case "Accepted":
          openJobs.push(job);
          break;
        case "Pending":
          pendingJobs.push(job);
          break;
        case "Closed":
          closeJobs.push(job);
          break;
      }
    });
    setOpen(openJobs);
    setClosed(closeJobs);
    setPending(pendingJobs);
  };

  useEffect(async () => {
    await updateContent();
  }, [jobs]);

  return (
    <>
      <div className="dashboardStatsContainer">
        <Label as="a" color="orange" ribbon>
          Jobs
        </Label>
        <Statistic.Group
          className="applicantsStats dashboardStats"
          size="small"
        >
          <Popup
            content="Total number of Jobs"
            trigger={
              <a href="/hr/jobs">
                <Statistic color="blue">
                  <Statistic.Value>{jobs.length}</Statistic.Value>
                  <Statistic.Label>
                    Total Jobs <br />
                  </Statistic.Label>
                </Statistic>
              </a>
            }
          />
          <Popup
            content={pending.length + " jobs are pending for action"}
            trigger={
              <Link to="/hr/jobs">
                <Statistic color={pending.length ? "orange" : "blue"}>
                  <Statistic.Value>{pending.length}</Statistic.Value>
                  <Statistic.Label>
                    Pending Jobs <br />
                  </Statistic.Label>
                </Statistic>
              </Link>
            }
          />
          <Popup
            content="Number of currently open jobs"
            trigger={
              <a href="/hr/jobs">
                <Statistic color="blue">
                  <Statistic.Value>{open.length}</Statistic.Value>
                  <Statistic.Label>Currently Open</Statistic.Label>
                </Statistic>
              </a>
            }
          />
          <Popup
            content="Number of jobs currently closed"
            trigger={
              <a href="/hr/jobs">
                <Statistic color="blue">
                  <Statistic.Value>
                    <Icon size="mini" name="calendar times outline" />
                    {closed.length}
                  </Statistic.Value>
                  <Statistic.Label>Closed</Statistic.Label>
                </Statistic>
              </a>
            }
          />
        </Statistic.Group>
        <Modal
          closeIcon={{
            style: { top: "1.0535rem", right: "1rem" },
            color: "black",
            name: "close",
          }}
          size="large"
        >
          <Modal.Header>
            <h3>Pending Applicants</h3>
          </Modal.Header>
          <Modal.Content scrolling></Modal.Content>
        </Modal>
      </div>
    </>
  );
}

export default JobStats;
