import React, { useEffect, useState } from "react";
import Root from "../HRComponents/Root";
import IntervieverRoot from "../InterviewerComponents/InterviewerRoot";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import { Button, Divider, Grid, Segment, Transition } from "semantic-ui-react";
function LoginSelection() {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    console.log("login selection");
    setTransition(true);
  }, []);

  function changeLocation(location) {
    const timer = setTimeout(() => {
      if (location === "hr") {
        document.location.href = "/hr/dashboard";
      } else if (location === "interviewer") {
        document.location.href = "/interviewer";
      }
    }, 500);
    return () => clearTimeout(timer);
  }

  return (
    <Switch>
      {console.log(document.location)}
      <Route
        exact
        path="/"
        render={() => {
          return (
            <div className="selectionContainer">
              {console.log("path /")}
              <Transition.Group
                animation={("browse", "browse")}
                duration={(1000, 500)}
              >
                {transition && (
                  <Segment className="loginSelection" placeholder>
                    <div className="loginSelectionContent">
                      <Grid columns={2} relaxed="very" stackable>
                        <Grid.Column>
                          <Button
                            content="Continue as Interviewer"
                            icon="signup"
                            size="big"
                            className="loginSelectionButton"
                            id="InterviewerSignin"
                            onClick={() => {
                              changeLocation("interviewer");
                              setTransition(false);
                            }}
                          />
                        </Grid.Column>

                        <Grid.Column verticalAlign="middle">
                          <Button
                            content="Continue as HR"
                            icon="signup"
                            size="big"
                            className="loginSelectionButton"
                            id="HRSignin"
                            onClick={() => {
                              changeLocation("hr");
                              setTransition(false);
                            }}
                          />
                        </Grid.Column>
                      </Grid>

                      <Divider vertical>Or</Divider>
                    </div>
                  </Segment>
                )}
              </Transition.Group>
            </div>
          );
        }}
      />
      <Route path="/hr" component={Root} />
      <Route path={"/interviewer"} component={IntervieverRoot} />
    </Switch>
  );
}

export default LoginSelection;
