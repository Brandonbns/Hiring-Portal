import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  login_request,
  login_success,
  login_failiure,
  user_login,
} from "../../globals";
import logo from "./logo.png";
import env from "../../environment.json";
import "./Login.css";
import { Transition } from "semantic-ui-react";
const mystyle = {
  display: "block",
  marginRight: "auto",
  margintop: "10%",
  marginbottom: "auto",
  paddingRight: "auto",
  float: "bottom",
  position: "fixed",
  top: "5%",
  right: "2%",
};

function LoginForm(props) {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTransition(true);
    }, 300);
  }, []);

  function performTransition() {
    setTransition(false);
    setTimeout(() => {
      setTransition(true);
    }, 100);
  }

  function login(e) {
    e.preventDefault();
    props.login_request();
    axios({
      method: "post",
      url: env.baseUrl + "/auth/login",
      data: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    })
      .then((response) => {
        sessionStorage.setItem("user", e.target.username.value);
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("logedin", true);
        props.login_success();
        props.setLogedin(true)
      })
      .catch((err) => {
        props.login_failiure(err.message);
        alert("Either of username or password is incorrect");
      });
  }

  return (
    <div className="container-fluid" onClick={() => performTransition()}>
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-6">
          <Transition visible={transition} animation={"jiggle"} duration={800}>
            <img
              src={logo}
              alt="logo"
              align="middle"
              style={mystyle}
              onClick={() => performTransition()}
            />
          </Transition>
        </div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <div className="loginForm">
                    <h1 className="login-heading mb-4">
                      Welcome to Hiring Portal!
                    </h1>
                    <form noValidate onSubmit={login}>
                      <div className="form-label-group">
                        <input
                          type="text"
                          id="username"
                          className="form-control"
                          placeholder="Username"
                          required
                          autoFocus
                        />
                        <label htmlFor="username">Username</label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password">Password</label>
                      </div>

                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember password
                        </label>
                      </div>

                      <button
                        className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>

                      <div className="text-center">
                        <a className="small" href="!#">
                          Forgot password?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    login_request: () => dispatch(login_request()),
    login_success: () => dispatch(login_success()),
    login_failiure: () => dispatch(login_failiure()),
    user_login: () => dispatch(user_login()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
