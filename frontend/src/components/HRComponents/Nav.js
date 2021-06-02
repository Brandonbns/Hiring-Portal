import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { log_out } from "../../globals";
import { connect } from "react-redux";

function NavBar(props) {
  const [logout, setLogout] = useState(false);
  const [interviewer, setInterviewer] = useState({
    isInterviewer: "",
    interviewer_id: "",
  });
  const [admin, setAdmin] = useState({ isAdmin: "", admin_id: "" });

  useEffect(async () => {
    let authdata = await props.authData;
    setInterviewer(authdata.authData.authData.interviewer);
    setAdmin(authdata.authData.authData.admin);
  }, [props]);

  return (
    <>
      <Navbar
        variant="tabs"
        className="justify-content-end Nav"
        activeKey="/home"
      >
        <Nav.Item>
          <Nav.Link>
            <Link className="nav-link" to="/hr/Dashboard">
              Dashboard
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            {" "}
            <Link className="nav-link" to="/hr/Jobs">
              Jobs
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link className="nav-link" to="/hr/Applicants">
              Applicants
            </Link>
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Interviews" id="nav-dropdown">
          <NavDropdown.Item>
            <Link to="/hr/interviews/">Interviews Home</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/hr/interviews/schedule">Schedule Interviews</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/hr/interviews/pendingInterviews">
              Pending Interviews
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
        {admin.isAdmin ? (
          <Nav.Item>
            <Nav.Link>
              <Link className="nav-link" to="/hr/newUser">
                Create New User
              </Link>
            </Nav.Link>
          </Nav.Item>
        ) : null}
        {interviewer.isInterviewer ? (
          <Nav.Item>
            <Nav.Link href="/">Switch to Interviewer</Nav.Link>
          </Nav.Item>
        ) : null}

        <Nav.Item
          onClick={() => {
            sessionStorage.clear();
            setLogout(true);
            props.log_out();
            document.location.href = "/";
          }}
        >
          <Nav.Link>logout</Nav.Link>
        </Nav.Item>
      </Navbar>
    </>
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
    log_out: () => dispatch(log_out()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
