import React, { Component, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Nav from "./Component/Navigationbar/Nav";
import Userprofile from "./Component/Profile/Userprofile";
import Editprofile from "./Component/Profile/temp";
import Joblist from "./Component/Jobs/joblist/Joblist";
import Interviews from "./Component/interviewsx/interviews";
import Signin from "./Component/Login/ApplicantLogin";
import Jobview from "./Component/home/Jobview/Jobview";
import AppliedJobview from "./Component/Jobs/applied-job-view/applied-job-view";
import Home from "./Component/home/main_job_list";
import Footer from "./Component/Footer/Footer";
import { authCheckState } from "../src/store/actions/auth";
import { connect } from "react-redux";
import Logout from "./Component/Login/Logout/Logout";
import ApplicantSignup from "./Component/Login/Signup/ApplicantSignup";
import "bootstrap/dist/css/bootstrap.min.css";
const createBrowserHistory = require("history").createBrowserHistory;

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  return (
    <Router history={createBrowserHistory()}>
      <div>
        <Nav />
        <Switch>
          {/*<Route path="/appliedjobview/:id"><AppliedJobview/></Route>*/}
          <Route path="/joblist/:id" component={Jobview} />
          <Route path="/joblist">
            <Joblist />
          </Route>
          <Route path="/editprofile">
            <Editprofile />
          </Route>
          <Route path="/userprofile" component={Userprofile} />
          <Route path="/interviews">
            <Interviews />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/signup" component={ApplicantSignup} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
