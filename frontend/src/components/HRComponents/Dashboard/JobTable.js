import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

function JobTable(props) {
  const [jobs, setjobs] = useState(props.states.jobs);
  const [rows, setRows] = useState([]);

  function getRows() {
    let rows = [];
    jobs.map((job) => {
      let data = {
        id: job.Job.job_id,
        title: job.Job.title,
        no_of_openings: job.Job.no_of_openings,
        description: job.Job.description,
        no_of_applicants: job.Applicants.length,
        status: job.Job.job_status,
        salary: job.Job.salary,
        deadline: new Date(job.Job.deadline).toDateString(),
        skills: job.Job.skills,
      };
      rows.push(data);
    });
    setRows(rows);
  }

  useEffect(() => {
    getRows();
  }, [jobs]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 100 },
    {
      field: "no_of_openings",
      headerName: "# of openings",
      type: "number",
      width: 120,
    },
    {
      field: "no_of_applicants",
      headerName: "Applied",
      type: "number",
      width: 110,
    },
    { field: "status", headerName: "Status", width: 90 },
    { field: "salary", headerName: "Salary", width: 90 },
    { field: "deadline", headerName: "Deadline", width: 120 },
    { field: "skills", headerName: "Skills", width: 180 },
  ];

  return (
    <div className="jobsTable dashboardStatsContainer">
      <div
        style={{
          height: "6%",
          width: "100%",
          verticalAlign: "middle",
          display: "flex",
        }}
      >
        <h3 style={{}}>Jobs</h3>
      </div>
      <div style={{ height: "90%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default JobTable;
