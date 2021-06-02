import "./App.css";
import React, { useEffect } from "react";
import { storeCollector } from "./globals";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import LoginPage from "./components/Auth/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";
const createBrowserHistory = require("history").createBrowserHistory;
function App(props) {
  useEffect(() => {
    props.storeCollector();
  }, []);

  return (
    <div id="app">
      
        <LoginPage></LoginPage>
      
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
