import React from "react";
import { useHistory } from "react-router";
import "./ApplicantLogin.css";

const ApplicantLogin = () => {
  const history = useHistory();

  const GotoSignup = (e) => {
    e.preventDefault();
    history.push("/applicantsignup");
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">Welcome!</h3>
                  <form>
                    <div className="form-label-group">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required
                        autoFocus
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="form-label-group">
                      <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="inputPassword">Password</label>
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
                    <h5 className="mt-4">
                      New here?&nbsp;
                      <a onClick={GotoSignup} href="!#">
                        Sign Up
                      </a>
                    </h5>
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
  );
};

export default ApplicantLogin;
