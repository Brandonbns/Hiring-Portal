import axios from "axios";
import React, { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import InterviewsStats from "./InterviewsStats";
import PendingInterviews from "./PendingInterviews";
import Schedule from "./Schedule";
import environment from "../../../environment.json";
import InterviewHomeContent from "./InterviewHomeContent";
import Calander from "./Calander";

function InterviewsHome() {
  const [pendingApplicants, setPendingApplicants] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [stats, setStats] = useState({});
  const [intDates, setIntDates] = useState([]);

  useEffect(async () => {
    try {
      var result = await axios.get(
        environment.baseUrl + "/interviews/InterviewsData"
      );
      setInterviews(result.data.interviews);
      setPendingApplicants(result.data.applicants);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    console.log(stats,'stat........');
  }, [stats])

  useEffect(async () => {
    if (interviews) {
      let dates = interviews.map((interview) => {
        return new Date(interview.Interview.int_date);
      });
      console.log(dates, "dates");
      setIntDates(dates);
    }
  }, [interviews]);

  return (
    <div id="interviewsHome" className="interviewsHome">
      <div id="intHomecontainer">
        <div className="confirmedInterviews">
          <InterviewHomeContent stats={stats} />
        </div>
        <div className="intStatsContainer">
          <InterviewsStats
            applicants={pendingApplicants}
            interviews={interviews}
            updateStats={setStats}
          />
        </div>
        <div className="pendindInterviews">
          <Calander interviewDates={intDates} upcoming={interviews} />
        </div>
      </div>
    </div>
  );
}

export default InterviewsHome;
