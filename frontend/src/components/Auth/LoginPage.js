import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Root from "../HRComponents/Root";
import IntervieverRoot from "../InterviewerComponents/InterviewerRoot";
import LoginForm from "./LoginForm";
import { storeCollector } from "../../globals";
import LoginSelection from "./LoginSelection";
import { Dimmer, Loader } from "semantic-ui-react";

function LoginPage(props) {
  const [Store, setStore] = useState(props.store);
  const [logedin, setLogedin] = useState(props.logedin);
  const [authData, setAuthData] = useState(props.store.authData);

  useEffect(() => {
    async function setData() {
      setStore(props.store);
      setLogedin(props.logedin);
      console.log(Store, logedin);
      let authdata = await props.store.authData;
      setAuthData(authdata);
    }
    setData();
  }, [props]);

  useEffect(() => {
    console.log("login page");
    props.storeCollector();
  }, []);

  if (authData) {
    if (authData.authData) {
      const { hr, interviewer } = authData.authData.authData;
      return (
        <div id="app">
          {hr.isHr && interviewer.isInterviewer ? (
            <>
              <LoginSelection />
            </>
          ) : interviewer.isInterviewer && !hr.isHr ? (
            <IntervieverRoot />
          ) : hr.isHr ? (
            <Root />
          ) : (
            <Root />
          )}
        </div>
      );
    } else {
      return <LoginForm setLogedin={(log) => setLogedin(log)} />;
    }
  } else {
    console.log(authData, "loading");
    return (
      <div className="loadingContainer">
        <Dimmer active inverted className="loadingContainer">
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    logedin: state.logedin,
    store: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeCollector: () => dispatch(storeCollector()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
