import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import env from "../../../environment.json";
import AnimationContainer from "./AnimationContainer.js";
import Calander from "./Calander";
import DashboardStats from "./DashboardStats";
import JobTable from "./JobTable";

function DashboardContainer() {
  const [data, setData] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [pendingApplicants, setpendingApplicants] = useState([])
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [intDates, setIntDates] = useState([]);
  let states = {
    applicants: applicants,
    interviews: interviews,
    jobs: jobs,
    data: data,
    pendingApplicants:pendingApplicants,
  };

  useEffect( () => {
    reqData()
  }, []);

  async function reqData(){
    try {
      var Data = await axios.get(env.baseUrl + "/dashboard/getData");
      console.log(Data.data);
      setData(Data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   setApplicants(data.Applicants);
  // }, [data.Applicants]);

  // useEffect(() => {
  //   setInterviews(data.Interviews);
  // }, [data.Interviews]);

  // useEffect(() => {
  //   setJobs(data.Jobs);
  // }, [data.Jobs]);

  // useEffect(() => {
  //   setJobs(data.PendingApplicants);
  // }, [data.PendingApplicants]);

useEffect(() => {
  setApplicants(data.Applicants);
  setInterviews(data.Interviews);
  setJobs(data.Jobs);
  setpendingApplicants(data.PendingApplicants);
}, [data])

  useEffect(() => {
    async function getDates(){
      if (interviews) {
      let dates = interviews.map((interview) => {
        return new Date(interview.Interview.int_date);
      });
      setIntDates(dates);
    }
    }
    getDates()
    
  }, [interviews]);



  if (!loading) {
    return (
      <div id="Dashboard">
        <div className="dashboardContainer">
          <div className="topLeft justifyCenter short large  ">
            <DashboardStats states={states} />
          </div>
          <div className="topRight justifyCenter medium height-fit-content padding-top ">
            <Calander interviewDates={intDates} upcoming={interviews} />
          </div>
          <div className="bottomLeft justifyCenter tall large ">
           {states.jobs?<JobTable states={states} />:null} 
          </div>
          <div className="bottomRight justifyCenter medium padding-top ">
            {" "}
            <AnimationContainer states={states} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loadingContainer">
        <Dimmer active inverted className="loadingContainer">
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}

export default DashboardContainer;
