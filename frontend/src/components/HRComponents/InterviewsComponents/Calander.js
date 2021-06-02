import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Icon, Popup } from "semantic-ui-react";

function Calander({ interviewDates, upcoming }) {
  const [value, onChange] = useState(new Date());
  const [intDates, setIntDates] = useState([]);

  useEffect(() => {
    setIntDates(interviewDates);
  }, [interviewDates]);

  function getInterviews(date) {
    let interviews = upcoming.filter(
      (interview) =>
        new Date(interview.Interview.int_date).toDateString() ===
        date.toDateString()
    );
    return interviews;
  }

  function convertTime(time) {
    return new Date(0, 0, 0, ...time.split(":")).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (intDates.find((x) => x.toDateString() === date.toDateString()))
            return "markedDate";
        }}
        tileContent={({ date, view }) => {
          if (intDates.find((x) => x.toDateString() === date.toDateString())) {
            let interviews = getInterviews(date);
            return (
              <Popup
                content={
                  <div>
                    {interviews.map((interview, i) => {
                      return (
                        <div>
                          {" "}
                          Interview #{i + 1} : From{" "}
                          {convertTime(interview.Interview.start_time)} to{" "}
                          {convertTime(interview.Interview.end_time)} at{" "}
                          {interview.Interview.location}
                          <br />
                          <br />
                        </div>
                      );
                    })}
                  </div>
                }
                trigger={
                  <p>
                    <Icon inverted name="info circle" />
                  </p>
                }
              />
            );
          }
        }}
      />
    </div>
  );
}

export default Calander;
