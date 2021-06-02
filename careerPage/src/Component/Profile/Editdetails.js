import React, { Component, useEffect, useState } from "react";
import "./Editdetails.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";
import { Link } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import * as actions from "../../store/actions";
import connect from "react-redux/es/connect/connect";

const Editdetails = (props) => {
  const [state, setstate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    address: "",
    password: "",
    password2: "",
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      phonenumber: "",
      address: "",
      password: "",
      password2: "",
    },
    isvalid: false,
    editbtn: true,
    details: [],
  });

  const [total, setTotal] = useState();
  useEffect(() => {
    setTotal(props.applicant_id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    errors.lastName == "" &&
    errors.firstName == "" &&
    errors.password2 == "" &&
    errors.phonenumber == "" &&
    errors.address == "" &&
    errors.email == "" &&
    errors.password == ""
      ? (state.isvalid = true)
      : (state.isvalid = false);
    console.log(state.isvalid);
    if (state.isvalid == true) {
      alert("Demo Form is submited");
    }
  };

  const edithandle = () => {
    setstate({ editbtn: !state.editbtn });
    console.log(state.editbtn);
  };

  const formValChange = (event) => {
    event.preventDefault();
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    const validPnumRegex = RegExp(/^[0-9\b]+$/);
    const { name, value } = event.target;
    let errors = { ...state.errors };
    switch (name) {
      case "firstName":
        if (value.length < 3) {
          errors.firstName = "First Name must be 3 characters long!";
        } else {
          errors.firstName = "";
          setstate({
            ...state,
            firstName: value,
          });
        }
        break;
      case "lastName":
        if (value.length < 3) {
          errors.lastName = "Last Name must be 3 characters long!";
        } else {
          errors.lastName = "";
          setstate({
            ...state,
            lastName: value,
          });
        }
        break;
      case "email":
        if (!validEmailRegex.test(value)) {
          errors.email = "Email is not valid!";
        } else {
          errors.email = "";
          setstate({
            ...state,
            email: value,
          });
        }
        break;

      case "phonenumber":
        if (!validPnumRegex.test(value)) {
          errors.phonenumber = "Phone number is not valid!";
        } else {
          errors.phonenumber = "";
          setstate({
            ...state,
            phonenumber: value,
          });
        }
        break;
      case "address":
        if (value.length < 3) {
          errors.address = "address must be 3 characters long!";
        } else {
          errors.address = "";
          setstate({
            ...state,
            address: value,
          });
        }
        break;
      case "password":
        if (value.length < 6) {
          errors.password = "Password must be 6 characters long!";
        } else {
          errors.password = "";
          setstate({
            ...state,
            password: value,
          });
        }
        break;
      case "password2":
        if (value !== state.password) {
          errors.password2 = "Passwords must match!";
        } else {
          errors.password2 = "";
          setstate({
            ...state,
            password2: value,
          });
        }
        break;
      default:
        break;
    }

    setstate({
      ...state,
      errors,
      [name]: value,
    });
  };
  const { errors } = state;

  return (
    <div class="container scr">
      <div class="row"></div>

      <br />
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-sm-2">
            <div class="row">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                class="rounded-circle"
                width="100px"
                height="175px"
              ></img>
            </div>
            <div class="row"></div>
            <div class="row">
              <div className="button1 text-center ">
                <button type="button" class="btn btn-danger">
                  Add Photo
                </button>
              </div>
            </div>
          </div>

          <div class="col-sm-1"></div>

          <div class="col-sm-8 detail">
            <div class="row ">
              <div class="col-sm-1"></div>
              <div class="col-1 pcolor">
                <AccountBoxIcon></AccountBoxIcon>
              </div>
              <div class="col-4 text1">
                <h6 class="mb-0">
                  <label>First Name</label>
                </h6>
              </div>
              <div class="col-sm-4">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  name="firstName"
                  onChange={formValChange}
                  required
                  value={total}
                />
              </div>
              <div className="text-danger">{state.errors.firstName}</div>
            </div>
            <hr></hr>

            <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-1 pcolor ">
                <AccountBoxIcon></AccountBoxIcon>
              </div>
              <div class="col-sm-4">
                <h6 class="mb-0">
                  <label>Last Name</label>
                </h6>
              </div>
              <div class="col-sm-4">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  name="lastName"
                  onChange={formValChange}
                  required
                />
              </div>
              {/*<div className="text-danger">{state.errors.lastName}</div>*/}
            </div>
            <hr></hr>

            <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-1 pcolor">
                <EmailIcon></EmailIcon>
              </div>
              <div class="col-sm-4">
                <h6 class="mb-0">
                  <label>Email</label>
                </h6>
              </div>
              <div class="col-sm-4">
                <input
                  type="email"
                  className="form-control rounded-pill"
                  name="email"
                  onChange={formValChange}
                  required
                />
              </div>
              {/*<div className="text-danger">{state.errors.email}</div>*/}
            </div>

            <hr></hr>
            <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-1 pcolor">
                <PhoneAndroidIcon />
              </div>
              <div class="col-sm-4">
                <h6 class="mb-0">
                  <label>Phone Number</label>
                </h6>
              </div>
              <div class="col-sm-4">
                <input
                  type="number"
                  className="form-control rounded-pill"
                  name="phonenumber"
                  onChange={formValChange}
                  required
                />
              </div>
              {/*<div className="text-danger">{state.errors.phonenumber}</div>*/}
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-1 pcolor">
                <LockIcon />
              </div>
              <div className="col-sm-4">
                <h6 className="mb-0">
                  <label>Password</label>
                </h6>
              </div>
              <div className="col-sm-4">
                <input
                  type="password"
                  className="form-control rounded-pill"
                  name="password"
                  onChange={formValChange}
                  required
                />
              </div>
              {/*<div className="text-danger">{state.errors.password}</div>*/}
            </div>

            <hr></hr>

            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-1 pcolor">
                <LockIcon />
              </div>
              <div className="col-sm-4">
                <h6 className="mb-0">
                  <label>Confirm Password</label>
                </h6>
              </div>
              <div className="col-sm-4">
                <input
                  type="password"
                  className="form-control rounded-pill"
                  name="password2"
                  onChange={formValChange}
                  required
                />
              </div>
              {/*<div className="text-danger">{state.errors.password2}</div>*/}
            </div>

            <div class="row">
              <div class="col-sm-5"></div>
              <div class="col-sm-4"></div>
              <div class="col-sm-3">
                <button className="btn btn-danger " type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    applicant_id: state.hp_userpanel_reducer.applicant_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_applicant_id: (id) => dispatch(actions.get_applicant_id(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editdetails);
