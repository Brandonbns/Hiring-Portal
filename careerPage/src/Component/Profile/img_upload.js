import React, {Component, useEffect, useState} from 'react';
import './Editdetails.css';

import connect from "react-redux/es/connect/connect";
import LaptopIcon from '@material-ui/icons/Laptop';
import WorkIcon from '@material-ui/icons/Work';
import {History} from 'react-router-dom';
import {storage} from "../../config/firebaseConfig";
import axios from 'axios';
import * as actions from "../../store/actions";
class Img_upload extends Component {

    constructor(props) {

        super(props)
        this.state = {
            imgUrl:'',
            image: null,
            progressx: false,
            progress: '',

        }
    }

    componentDidMount() {
        this.setState({imgUrl:this.props.applicant_imgUrl});

    }

    handleChange = e => {
        if (e.target.files[0]) {
            this.setState({image: e.target.files[0]});
        }

    };



    handleUpload = () => {
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({progress: progress});
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref(`images`)
                    .child(this.state.image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                         this.setState({imgUrl: url});
                        this.props.get_imgurl(url);
                        this.setState({progressx: true});
                        alert('Upload Completed')

                    });
            }
        );
        // this.props.get_imgurl(this.state.imgUrl);
    };


    render() {
        return (

                            <div className="col-sm-2">
                                <div className="row">
                                    <img src={this.state.imgUrl || "http://via.placeholder.com/300"}
                                         alt="firebase-image"
                                         className="imgsize" className="rounded-circle"/>
                                </div>
                                <div className="row"></div>
                                <div className="row">
                                    <div className="button1 text-center ">
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop">Add Photo
                                        </button>
                                    </div>
                                </div>

                                <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static"
                                     data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">

                                                <input type="file" className="form-control rounded-pill"
                                                       onChange={this.handleChange}/>
                                                <div className="progress">

                                                </div>
                                            </div>


                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close
                                                </button>
                                                <button type="button" className="btn btn-primary"
                                                        data-bs-dismiss="modal"
                                                        onClick={this.handleUpload}>Upload
                                                </button>
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
        applicant_id: state.hp_userpanel_reducer.applicant_id,
        applicant_imgUrl:state.hp_userpanel_reducer.applicant_imgUrl,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        get_imgurl: (url) => dispatch(actions.get_imgurl(url)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Img_upload);
