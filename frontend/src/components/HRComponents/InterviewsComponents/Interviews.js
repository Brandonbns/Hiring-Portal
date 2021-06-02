import React from "react";

import { Router, Route } from "react-router";
import browserHistory from "history/createBrowserHistory";
import schedule from "./Schedule";
import PendingInterviews from "./PendingInterviews";

function Interviews() {
  return (
    <div id="interviews">
      <Router history={browserHistory()}>
        <Route
          exact
          path="/hr/interviews"
          render={() => {
            return (
              <>
                <input
                  type="Button"
                  value="Schedule Interviews"
                  onClick={() =>
                    (window.location.href = "/hr/interviews/schedule")
                  }
                ></input>
                <input
                  type="Button"
                  value="Pending Interviews"
                  onClick={() =>
                    (window.location.href = "/hr/interviews/pendingInterviews")
                  }
                ></input>
                <input
                  type="Button"
                  value="View Interview info"
                  onClick={() => (window.location.href = "/hr/interviews/info")}
                ></input>
              </>
            );
          }}
        />
        <Route path="/hr/interviews/schedule" component={schedule} />
        <Route
          path="/hr/interviews/pendingInterviews"
          component={PendingInterviews}
        />
      </Router>
    </div>
  );
}

export default Interviews;
