import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

function JobsChart(props) {
  const [jobs, setJobs] = useState(props.jobs);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [openings, setOpenings] = useState([]);

  const getData = (Data) =>
    (Data = {
      labels: [...labels],
      datasets: [
        {
          label: "# of Applicants",
          data: [...data],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });

  const [chartData, setChartData] = useState(() => getData());

  function updateContent() {
    let Labels = [];
    let Data = [];
    let Openings = [];
    jobs.map((job) => {
      Labels.push(job.Job.title);
      Data.push(job.Applicants.length);
      Openings.push(job.Job.no_of_openings);
    });
    setData(Data);
    setLabels(Labels);
    setOpenings(Openings);
  }

  useEffect(() => {
    setChartData(() => getData());
  }, [data, labels, openings]);

  useEffect(() => {
    updateContent();
  }, []);

  const options = {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Job Summary",
      },
    },
  };
  return (
    <div className="full">
      <div id="header">
        <h3 className="no-margin">Jobs Summary</h3>
      </div>
      <div className="chartContainer">
        <div className="full">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default JobsChart;
