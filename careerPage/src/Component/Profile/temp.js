import React, {Component, useEffect, useState} from 'react';
import './Editdetails.css';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';
import {Link} from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import * as actions from "../../store/actions";
import connect from "react-redux/es/connect/connect";
import LaptopIcon from '@material-ui/icons/Laptop';
import WorkIcon from '@material-ui/icons/Work';
import {History} from 'react-router-dom';
import {storage} from "../../config/firebaseConfig";
import axios from 'axios';
import Imgupload from './img_upload'
import Cvupload from './cvupload'
import WcIcon from '@material-ui/icons/Wc';
import env from "../../config/env.json"

const Editdetails =(props)=> {


    const  [state, setstate] = useState(  {

        firstName: "",
        lastName: "",
        gender:"",
        email: "",
        phonenumber: "",
        bio: '',
        skills: '',
        workexperience: '',
        username: '',
        errors: {
            firstName: "",
            lastName: "",
            email: "",
            phonenumber: "",
        },
        isvalid:false,

    })




    useEffect(() => {

        setTimeout(function() { //Start the timer
           console.log(props.img_url)

        }.bind(this), 1000)
    }, [props.applicant_id]);



  const  Changehandler = (event) => {
        setstate({[event.target.name]: event.target.value})
    }


    const  handleSubmit = e=>{

        e.preventDefault();
        errors.phonenumber==""&&errors.email==""?state.isvalid=true:state.isvalid=false;

        if (state.isvalid===true){
            var axios = require('axios');

            var data = JSON.stringify({ "applicant_iD":props.applicant_id, "f_name":state.firstName===''?props.applicant_fName:state.firstName , "l_name":state.lastName===''?props.applicant_lName:state.lastName ,  "contact_no":state.phonenumber===''?props.applicant_contactNo:state.phonenumber, "work_experience": state.workexperience===''? props.applicant_workExperience:state.workexperience,
                "skills": state.skills===''?props.applicant_skills:state.skills, "img_url": props.image_url, "bio": state.bio===''?props.applicant_bio:state.bio, "user_name": state.username===''?props.applicant_userName:state.username,"email":state.email===''?props.applicant_email:state.email,"gender":state.gender===''?props.applicant_gender:state.gender});

            var config = {
                method: 'put',
                url: env.baseUrl+`/applicant/applicants/applicant/${props.applicant_id}`,
                headers: {
                    'Content-Type': 'application/json',

                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    alert('Updated!')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else {
            alert('Please input valid information');
        }


    }

 // const  handleSubmit = e => {
 //        e.preventDefault();
 //
 //    };


    const   formValChange = (event) => {
        event.preventDefault();
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        const validPnumRegex = RegExp(
            /^[0-9]{10}$/
        );
        const validletterRegex = RegExp(
            /^[a-zA-Z]+$/
        );
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

                <div class="row">


                </div>


                <br/>
                <form onSubmit={handleSubmit}>

                    <div class="row">

                        <Imgupload/>
                        <div class="col-sm-1">


                        </div>


                        <div class="col-sm-8 detail">
                            <div class="row ">
                                <div class="col-sm-1"></div>
                                <div class="col-1 pcolor"><AccountBoxIcon></AccountBoxIcon></div>
                                <div class="col-4 text1"><h6 class="mb-0"><label>First Name</label></h6></div>
                                <div class="col-sm-4"><input type="text" className="form-control rounded-pill"
                                                             value={state.firstName}
                                                             placeholder={ props.applicant_fName}
                                                             name="firstName" onChange={formValChange}
                                                             maxLength='20'

                                                             /></div>
                                <div className="text-danger">{state.errors.firstName}</div>

                            </div>
                            <hr></hr>


                            <div class="row">
                                <div class="col-sm-1"></div>
                                <div class="col-1 pcolor "><AccountBoxIcon></AccountBoxIcon></div>
                                <div class="col-sm-4"><h6 class="mb-0"><label>Last Name</label></h6></div>
                                <div class="col-sm-4"><input type="text" className="form-control rounded-pill"
                                                             value={state.lastName}
                                                             name="lastName" onChange={formValChange}
                                                             placeholder={ props.applicant_lName}
                                                             maxLength='20'
                                                             /></div>
                                <div className="text-danger">{state.errors.lastName}</div>

                            </div>
                            <hr></hr>

                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-1 pcolor "><WcIcon></WcIcon></div>
                                <div className="col-sm-4"><h6 className="mb-0"><label>Gender</label></h6></div>
                                <div className="col-sm-4">
                                    <select className="form-control tm-select" name="gender"
                                            onChange={formValChange} required>

                                        <option value="male" selected={props.applicant_gender==='male'}>male</option>
                                        <option value="female" selected={props.applicant_gender==='female'}>female</option>


                                    </select>

                                </div>

                            </div>
                            <hr></hr>

                            <div class="row">
                                <div class="col-sm-1"></div>
                                <div class="col-1 pcolor"><EmailIcon></EmailIcon></div>
                                <div class="col-sm-4"><h6 class="mb-0"><label>Email</label></h6></div>
                                <div class="col-sm-4"><input type="email" className="form-control rounded-pill"
                                                             name="email" onChange={formValChange}
                                                             placeholder={ props.applicant_email}
                                /></div>
                                <div className="text-danger">{state.errors.email}</div>
                            </div>


                            <hr></hr>
                            <div class="row">

                                <div class="col-sm-1"></div>
                                <div class="col-1 pcolor"><PhoneAndroidIcon/></div>
                                <div class="col-sm-4"><h6 class="mb-0"><label>Phone Number</label></h6></div>
                                <div class="col-sm-4"><input type="number" className="form-control rounded-pill"
                                                             value={state.phonenumber}
                                                             name="phonenumber" onChange={formValChange}
                                                             placeholder={ props.applicant_contactNo}
                                />

                                </div>
                                <div className="text-danger">{state.errors.phonenumber}</div>
                            </div>
                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-1"></div>
                                <div className="col-1 pcolor"><AccountBoxIcon/></div>
                                <div className="col-sm-4"><h6 className="mb-0"><label>Bio</label></h6></div>
                                <div className="col-sm-6"><textarea className="form-control rounded-pill"
                                                                    value={state.bio}
                                                                    rows="4" cols="30"
                                                                    name="bio" onChange={formValChange}
                                                                    placeholder={ props.applicant_bio}
                                                                    maxLength='40'
                                                                    ></textarea>

                                </div>

                            </div>

                            <hr></hr>
                            <div className="row">

                                <div className="col-sm-1"></div>
                                <div className="col-1 pcolor"><LaptopIcon/></div>
                                <div className="col-sm-4"><h6 className="mb-0"><label>Skills</label></h6></div>
                                <div className="col-sm-4"><input type="text" className="form-control rounded-pill"
                                                                 value={state.skills}
                                                                 name="skills" onChange={formValChange}
                                                                 placeholder={ props.applicant_skills}
                                                                 maxLength='30'
                                                                 />
                                </div>

                            </div>

                            <hr></hr>

                            <div className="row">

                                <div className="col-sm-1"></div>
                                <div className="col-1 pcolor"><WorkIcon/></div>
                                <div className="col-sm-4"><h6 className="mb-0"><label>Work Experience</label></h6></div>
                                <div className="col-sm-4"><input type="number" className="form-control rounded-pill"
                                                                 value={state.workexperience}
                                                                 name="workexperience" onChange={formValChange}
                                                                 placeholder={ props.applicant_workExperience}
                                                                 max='20' min='0'
                                                                 />
                                </div>

                            </div>
                            <hr/>
                            <Cvupload/>
                            <hr/>


                            <div class="row">
                                <div class="col-sm-5"></div>
                                <div class="col-sm-4"></div>
                                <div class="col-sm-3">
                                    <button className="btn btn-danger " type='submit'>Save</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
}

const mapStateToProps = state => {
    return {
        applicant_id: state.hp_userpanel_reducer.applicant_id,
        applicant_fName: state.hp_userpanel_reducer.applicant_fName,
        applicant_lName: state.hp_userpanel_reducer.applicant_lName,
        applicant_gender: state.hp_userpanel_reducer.applicant_gender,
        applicant_contactNo:state.hp_userpanel_reducer.applicant_contactNo,
        applicant_workExperience:state.hp_userpanel_reducer.applicant_workExperience,
        applicant_skills:state.hp_userpanel_reducer.applicant_skills,
        applicant_imgUrl:state.hp_userpanel_reducer.applicant_imgUrl,
        applicant_bio:state.hp_userpanel_reducer.applicant_bio,
        applicant_userName:state.hp_userpanel_reducer.applicant_userName,
        applicant_email:state.hp_userpanel_reducer.applicant_email,
        image_url:state.hp_userpanel_reducer.image_url,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(Editdetails);
