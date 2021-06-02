import React, {Component, useEffect, useState} from 'react';
import './Userprofile.css';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WcIcon from '@material-ui/icons/Wc';
import EmailIcon from '@material-ui/icons/Email';
import {Link} from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import LaptopIcon from '@material-ui/icons/Laptop';
import WorkIcon from '@material-ui/icons/Work';
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {History} from 'react-router-dom';
import * as actions from '../../../src/store/actions/index';
import Password from './password'
import env from "../../config/env.json"

class Userprofile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            applicant: [],
            error: false,
            cv:null,
            img:null
        }

    }

    componentDidMount() {
        fetch(env.baseUrl+'/applicant/applicants/applicant/' + this.props.applicant_id)//2
            .then(res => res.json())
            .then(applicant =>
                this.setState({applicant: applicant.data}),
            ).catch(error => {
                this.setState({error: true});
            });

            // this.props.get_applicant_detail(this.state.applicant)

        axios
            .post(env.baseUrl+'/applicant/cvs/search', {
                applicant_iD:this.props.applicant_id
            })
            .then(response => {
                console.log(response.data ,'cv res');
                const distance = response.data.data[0].cv_url;
                 console.log(distance,'cv');
                 this.setState({cv: distance});
                // this.setState({cv:response.data.data})
                 // console.log(response.data.)

            })
            .catch(error => {
                console.log(error)
            })
    }


    handle_edit = () => {
        this.props.get_applicant_detail(this.state.applicant.f_name,this.state.applicant.l_name,this.state.applicant.gender,this.state.applicant.contact_no,this.state.applicant.work_experience,this.state.applicant.skills,this.state.applicant.img_url,
            this.state.applicant.bio,this.state.applicant.user_name,this.state.applicant.email);
        this.props.get_imgurl(this.state.applicant.img_url)
         // this.props.history.push('/editprofile')

    }

    handle_cv = () => {

        // this.props.history.push('/interviews')

    }


    handle_applied_jobs = () => {
        // console.log(this.state.cv[0].cvUrl)
        this.props.history.push('/joblist')

    }


    render() {

        return (


            <div class="container scr">

                <div class="row">


                </div>

                <div class="row">

                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                         tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <Password/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>




                    <div class="col-sm-2">

                        <Link type="button" to="/joblist"
                                className="btn btn-outline-danger">Jobs
                        </Link>


                    </div>
                    <div className="col-sm-2">
                        <button type="button"
                                className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Password
                        </button>

                    </div>
                    <div class="col-sm-8"></div>
                </div>
                <br/>


                <div class="row">

                    <div class="col-sm-2">
                        <div class="row"><img src={this.state.applicant.img_url || "http://via.placeholder.com/300"}
                                              alt="firebase-image"
                                              className="imgsize" className="rounded-circle"/></div>
                        <div class="row"></div>


                    </div>


                    <div class="col-sm-1">


                    </div>


                    <div class="col-sm-8 detail">
                        <div class="row ">
                            <div class="col-sm-1"></div>
                            <div class="col-1 pcolor"><AccountBoxIcon></AccountBoxIcon></div>
                            <div class="col-4 text1"><h6 class="mb-0"><label>First Name</label></h6></div>

                            <div class="col-sm-4 ">{this.state.applicant.f_name}</div>
                        </div>
                        <hr></hr>


                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-1 pcolor "><AccountBoxIcon></AccountBoxIcon></div>
                            <div class="col-sm-4"><h6 class="mb-0"><label>Last Name</label></h6></div>
                            <div class="col-sm-4 ">{this.state.applicant.l_name}</div>
                        </div>

                        <hr></hr>

                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-1 pcolor "><WcIcon></WcIcon></div>
                            <div className="col-sm-4"><h6 className="mb-0"><label>Gender</label></h6></div>
                            <div className="col-sm-4 ">{this.state.applicant.gender}</div>
                        </div>

                        <hr></hr>

                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-1 pcolor"><EmailIcon></EmailIcon></div>
                            <div class="col-sm-4"><h6 class="mb-0"><label>Email</label></h6></div>
                            <div class="col-sm-4 ">{this.state.applicant.email}</div>
                        </div>
                        <hr></hr>

                        <div class="row">

                            <div class="col-sm-1"></div>
                            <div class="col-1 pcolor"><PhoneAndroidIcon/></div>
                            <div class="col-sm-4"><h6 class="mb-0"><label>Phone Number</label></h6></div>
                            <div class="col-sm-4 ">{this.state.applicant.contact_no}</div>
                        </div>
                        <hr></hr>


                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-1 pcolor "><AccountBoxIcon></AccountBoxIcon></div>
                            <div className="col-sm-4"><h6 className="mb-0"><label>Bio</label></h6></div>
                            <div className="col-sm-6 ">{this.state.applicant.bio}</div>
                        </div>
                        <hr></hr>


                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-1 pcolor "><LaptopIcon></LaptopIcon></div>
                            <div className="col-sm-4"><h6 className="mb-0"><label>Skills</label></h6></div>
                            <div className="col-sm-4 ">{this.state.applicant.skills}</div>
                        </div>
                        <hr></hr>


                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-1 pcolor "><WorkIcon></WorkIcon></div>
                            <div className="col-sm-4"><h6 className="mb-0"><label>Work Experience</label></h6></div>
                            <div className="col-sm-4 ">{this.state.applicant.work_experience} year</div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-1 pcolor "><WorkIcon></WorkIcon></div>
                            <div className="col-sm-4"><h6 className="mb-0"><label>CV</label></h6></div>
                            <div className="col-sm-4 ">

                                {/*{cv_item}*/}
                                <a  href={this.state.cv} download="awwad.pdf">Click here to
                                    view cv</a>


                            </div>
                        </div>


                        <div class="row">
                            <div class="col-sm-5"></div>
                            <div class="col-sm-4"></div>
                            <div class="col-sm-3">

                                <Link className="btn btn-danger " onClick={this.handle_edit} to="/editprofile">Edit details</Link>


                            </div>
                        </div>


                    </div>


                </div>


            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        applicant_id: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {

        get_applicant_id: (id) => dispatch(actions.get_applicant_id(id)),
        get_applicant_detail: (fName,lName,gender,contactNo,workExperience,skills,imgUrl,bio,userName,email) => dispatch(actions.get_applicant_details(fName,lName,gender,contactNo,workExperience,skills,imgUrl,bio,userName,email)),
        get_imgurl: (url) => dispatch(actions.get_imgurl(url)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Userprofile);
