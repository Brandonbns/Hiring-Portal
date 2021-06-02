import env from "../../config/env.json"
import React, {Component, useEffect, useState} from 'react';
import './Editdetails.css';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import {Link} from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import * as actions from "../../store/actions";
import connect from "react-redux/es/connect/connect";

const Password = (props) => {


    const [state, setstate] = useState({


        password: "",
        password2: "",
        current_password: '',
        errors: {

            password: "",
            password2: "",
            current_password: '',
        },
        isvalid: false,

    })


    const handleSubmit = e => {

        e.preventDefault();
        errors.password2 == "" && errors.password == "" ? state.isvalid = true : state.isvalid = false;
        console.log(state.isvalid);
        if (state.isvalid == true) {
            var axios = require('axios');

            var data = JSON.stringify(
                {
                    "prevpassword": state.current_password,
                    "newpassword": state.password,
                    "confirmpassword": state.password2,
                }
            );

            var config = {
                method: 'put',
                url: env.baseUrl+`/applicant/applicants/pw-reset/${props.applicant_id}`,
                headers: {
                    'Content-Type': 'application/json',

                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    //console.log(JSON.stringify(response.data));
                    alert("Updated Successfully!")
                })
                .catch(function (error) {
                    console.log(error);
                });


        }else {
            alert('Please input correct details');
        }


    }


    const formValChange = (event) => {
        event.preventDefault();
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );

        const {name, value} = event.target;
        let errors = {...state.errors};
        switch (name) {

            case "current_password":
                if (value.length < 6) {
                    errors.current_password = "Password must be 6 characters long!";
                } else {
                    errors.current_password = "";
                    setstate({
                        ...state,
                        current_password: value,
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
    const {errors} = state;


    return (


        <div class="container ">

            <div class="row">


            </div>


            <br/>
            <form onSubmit={handleSubmit}>

                <div class="row">


                    <div className="row">


                        <div className="col-1 pcolor"><LockIcon/></div>
                        <div className="col-sm-5"><h6 className="mb-0"><label>Current Password</label></h6></div>
                        <div className="col-sm-5"><input type="password" className="form-control rounded-pill"
                                                         name="current_password" onChange={formValChange} required

                        /></div>
                        <div className="text-danger">{state.errors.current_password}</div>
                    </div>

                    <hr></hr>

                    <div className="row">

                        <div className="col-1 pcolor"><LockIcon/></div>
                        <div className="col-sm-5"><h6 className="mb-0"><label>Password</label></h6></div>
                        <div className="col-sm-5"><input type="password" className="form-control rounded-pill"
                                                         name="password" onChange={formValChange} required

                        /></div>
                        <div className="text-danger">{state.errors.password}</div>
                    </div>

                    <hr></hr>

                    <div className="row">


                        <div className="col-1 pcolor"><LockIcon/></div>
                        <div className="col-sm-5"><h6 className="mb-0"><label>Confirm Password</label></h6></div>
                        <div className="col-sm-5"><input type="password" className="form-control rounded-pill"
                                                         name="password2" onChange={formValChange} required

                        /></div>
                        <div className="text-danger">{state.errors.password2}</div>
                    </div>


                    <div class="row">
                        <div class="col-sm-5"></div>
                        <div class="col-sm-4"></div>
                        <div class="col-sm-3">
                            <button className="btn btn-danger " type='submit'>Save</button>
                        </div>
                    </div>


                </div>
            </form>

        </div>

    )
}

const mapStateToProps = state => {
    return {
        applicant_id: state.hp_userpanel_reducer.applicant_id
    }
};

const mapDispatchToProps = dispatch => {
    return {

        get_applicant_id: (id) => dispatch(actions.get_applicant_id(id))

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Password);
