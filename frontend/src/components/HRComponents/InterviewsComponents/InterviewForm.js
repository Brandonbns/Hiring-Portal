import axios from "axios";
import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import InterviewTab from "./InterviewTab";

import environment from "../../../environment.json";

function InterviewForm({ applicant, assigned }) {
  const [interviews, setInterviews] = useState(null);
  useEffect(async () => {
    try {
      var result = await axios.get(
        environment.baseUrl + "/interviews/Interviews"
      );
      setInterviews(result.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Segment id="InterviewForm" loading={!interviews}>
      {interviews ? (
        interviews.map((interview, i) => (
          <>
            <InterviewTab
              interview={interview}
              applicant={applicant}
              assigned={assigned}
            >
              {" "}
            </InterviewTab>
          </>
        ))
      ) : (
        <p>No Pending Interviews</p>
      )}
    </Segment>
  );
}

export default InterviewForm;
