import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import environment from "../../../environment.json";
import Calander from "./Calander";

import UpcomingInterviewPane from "./UpcomingInterviewPane";

function Upcoming(props) {
  const [interviewerID, setInterviewerID] = useState(props.interviewerID);
  const [upcoming, setUpcoming] = useState([]);
  const [intDates, setIntDates] = useState([]);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    axios({
      method: "post",
      url: environment.baseUrl + "/interviewer/upcoming",
      data: { interviewerID: interviewerID },
    })
      .then((Response) => {
        setUpcoming(Response.data);
        setloading(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(async () => {
    if (upcoming) {
      let dates = upcoming.map((interview) => {
        return new Date(interview.Interview.int_date);
      });
      setIntDates(dates);
    }
  }, [upcoming]);

  return (
    <>
      <div id="interviewerUpcoming" className="interviewerUpcoming">
        {console.log(
          useSelector((state) => state),
          "use selector"
        )}
        <div id="upcomingcontainer" className="upcomingontainer">
          <div className="upcomingInterviews">
            <UpcomingInterviewPane
            loading={loading}
              upcoming={upcoming}
              interviewerID={interviewerID}
            />
          </div>
          <div className="calanderContainer">
            <Calander interviewDates={intDates} upcoming={upcoming} />
          </div>
          <div className="lowerContainer"></div>
        </div>
      </div>
    </>
  );
}

export default Upcoming;
