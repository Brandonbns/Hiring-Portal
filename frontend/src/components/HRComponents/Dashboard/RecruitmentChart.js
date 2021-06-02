import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

function RecruitmentChart(props) {
  const { applicants, jobs } = props;
  const [confirmedApplicants, setConfirmedApplicants] = useState([]);
  const [pendingApplicants, setPendingApplicants] = useState([]);
  const [acceptedPendings, setAcceptedPendings] = useState([]);
  const [interviewed, setInterviewed] = useState([]);
  const [rejected, setRejected] = useState([]);

  const getData = (data) =>
    (data = {
      labels: [
        "Interviewed",
        "Interview Confirmed",
        "To be Assigned",
        "Pending",
        "Rejected",
      ],
      datasets: [
        {
          label: "Applicant Summary",
          data: [
            interviewed.length,
            confirmedApplicants.length,
            acceptedPendings.length,
            pendingApplicants.length,
            rejected.length,
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.3)",
            "rgba(00, 192, 00, 0.3)",
            "rgba(153, 102, 255, 0.3)",
            //'rgba(255, 159, 64, 0.2)',
            "rgba(255, 206, 86, 0.3)",
            "rgba(255, 00, 00, 0.3)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(00, 192, 00, 1)",
            "rgba(153, 102, 255, 1)",
            //'rgba(255, 159, 64, 1)',
            "rgba(255, 206, 86, 1)",
            "rgba(255, 00, 00, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

  const options = {
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide

    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Applicant Summary",
      },
    },
  };

  const [data, setData] = useState(() => getData());

  const updateContent = async () => {
    let confirmed = []; // already assigned to interviews
    let pending = []; // require confirmation
    let tobeAssigned = []; // to be assigned to interviews
    let Interviewed = [];
    let Rejected = [];
    applicants.map((applicant) => {
      switch (applicant.status) {
        case "accepted-pending":
          tobeAssigned.push(applicant);
          break;
        case "pending":
          pending.push(applicant);
          break;
        case "confirmed":
          confirmed.push(applicant);
          break;
        case "interviewed":
          Interviewed.push(applicant);
          break;
        case "rejected":
          Rejected.push(applicant);
          break;
      }
    });
    setConfirmedApplicants(confirmed);
    setPendingApplicants(pending);
    setAcceptedPendings(tobeAssigned);
    setInterviewed(Interviewed);
    setRejected(Rejected);
  };

  useEffect(() => {
    setData(() => getData());
  }, [
    confirmedApplicants,
    pendingApplicants,
    acceptedPendings,
    interviewed,
    rejected,
  ]);

  useEffect(async () => {
    await updateContent();
  }, [applicants]);

  return (
    <div className="full">
      <div className="header">
        <h3 className="no-margin">Applicant Summary</h3>
      </div>
      <div className="chartContainer">
        <div className="full">
          <Doughnut height="100%" width="100%" data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default RecruitmentChart;
