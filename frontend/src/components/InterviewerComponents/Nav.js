import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { log_out } from "../../globals";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function NavBar(props) {
  const [logout, setLogout] = useState(false);
  const [hr, setHr] = useState(props.hr);

  useEffect(() => {
    setHr(props.hr);
  }, [props]);

  return (
    <>
      <Navbar className="justify-content-end Nav" activeKey="/home">
        <Nav.Item>
          <Nav.Link>
            <Link className="nav-link" to="/interviewer/upcoming">
              Upcoming Interviews
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link className="nav-link" to="/interviewer/pending">
              Pending Confirmations
            </Link>
          </Nav.Link>
        </Nav.Item>
        {hr.isHr ? (
          <Nav.Item>
            <Nav.Link className="nav-link" href="/">
              Switch to HR
            </Nav.Link>
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
          <Nav.Link className="nav-link">logout</Nav.Link>
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
