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
import env from "../../config/env.json"
class Cvupload extends Component {

    constructor(props) {

        super(props)
        this.state = {

            applicant: [],
            firstName: "",
            lastName: "",
            email: "",
            phonenumber: "",
            bio: '',
            skills: '',
            workexperience: '',
            imgUrl:'',
            username:'',
            image: null,
            progressx: false,
            progress: '',
            cv: null

        }
    }

    componentDidMount() {

        this.setState({firstName:this.props.applicant_fName});
        this.setState({lastName:this.props.applicant_lName});
        this.setState({phonenumber:this.props.applicant_contactNo});
        this.setState({workexperience:this.props.applicant_workExperience});
        this.setState({skills:this.props.applicant_skills});
        this.setState({imgUrl:this.props.applicant_imgUrl});
        this.setState({bio:this.props.applicant_bio});
        this.setState({username:this.props.applicant_userName});
        this.setState({email:this.props.applicant_email});
        //
    }



    handleChange_cv = e => {
        if (e.target.files[0]) {
            this.setState({cv: e.target.files[0]});
        }

    };




    handleSubmit = e => {
        e.preventDefault();


        var bodyFormData = new FormData();
        bodyFormData.append('cv', this.state.cv);

        axios.put(env.baseUrl+`/applicant/cvs/update-cv/${this.props.applicant_id}`, bodyFormData)
            .then(function (response) {
                console.log(response);
                alert("Updated Successfully!")
            })
            .catch(function (response) {
                console.log(response,'upload not successfull');
                alert('failed to upload CV')
            });

    };


    render() {
        return (



                            <div className="row">

                                <div className="col-sm-1"></div>
                                <div className="col-1 pcolor"><WorkIcon/></div>
                                <div className="col-sm-4"><h6 className="mb-0"><label>CV</label></h6></div>
                                <div className="col-sm-4">  <input type="file" className="form-control rounded-pill" onChange={this.handleChange_cv}/>

                                </div>
                                <div className="col-sm-1">

                                    <button type='button' className='btn btn-secondary' onClick={this.handleSubmit}>Upload</button>
                                </div>

                            </div>


        )

    }
}

const mapStateToProps = state => {
    return {
        applicant_id: state.hp_userpanel_reducer.applicant_id,
        applicant_fName: state.hp_userpanel_reducer.applicant_fName,
        applicant_lName: state.hp_userpanel_reducer.applicant_lName,
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
export default connect(mapStateToProps, mapDispatchToProps)(Cvupload);
