import React, {Component} from 'react';
import {withRouter} from "react-router";
import axios from 'axios';
import * as actions from "../../../store/actions";
import connect from "react-redux/es/connect/connect";
import {History} from 'react-router-dom';
import env from "../../../config/env.json"

class Applied_job_view extends Component {

    constructor(props) {
        super(props)
        this.state = {
            job: [],
            error: false,

        }
    }

    componentDidMount() {

        fetch(env.baseUrl+'/applicant/jobs/job/' + this.props.match.params.id)
            .then(res => res.json())
            .then(job =>
                this.setState({job: job.data}),
            )
            .catch(error => {

                this.setState({error: true});
            });

    }

    handlesubmit = () => {

    }


    render() {

        return (

            <div>

                <div className="App">
                    <br/>
                    <div class="container scr border border-danger">

                        <div class="row">


                        </div>


                        <div class="row">

                            <div class="col-sm-2">
                                {/*<div className="row"><img src="https://bootdey.com/img/Content/avatar/avatar7.png"*/}
                                {/*alt="Admin"*/}
                                {/*className="rounded-circle" width="100px" height="175px"></img>*/}
                                {/*</div>*/}
                                <div class="row"></div>


                            </div>


                            <div class="col-sm-1">


                            </div>


                            <div class="col-sm-8 detail">

                                <div class="row ">
                                    <div class="row"><h3>{this.state.job.title} </h3></div>
                                    <div class="col-sm-1"></div>

                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm-1"></div>

                                    <div className="col-sm-3"><h6 className="mb-0"><label>Skills</label></h6>
                                    </div>
                                    <div className="col-sm-8">{this.state.job.skills}</div>
                                </div>
                                <hr/>

                                <div class="row">
                                    <div class="col-sm-1"></div>

                                    <div class="col-sm-3"><h6 class="mb-0"><label>Salary</label></h6></div>
                                    <div class="col-sm-8">{this.state.job.salary} (LKR)</div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-1"></div>

                                    <div className="col-sm-3"><h6 className="mb-0"><label>Deadline</label></h6></div>
                                    <div className="col-sm-8">{this.state.job.deadline}</div>
                                </div>
                                <hr/>
                                <div class="row">

                                    <div class="col-sm-1"></div>

                                    <div class="col-sm-3"><h6 class="mb-0"><label>Description</label></h6></div>
                                    <div class="col-sm-8">{this.state.job.description}</div>
                                </div>

                                <hr/>

                                <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static"
                                     data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                     aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel">Confirm here</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>


                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Close
                                                </button>
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                                        onClick={this.handlesubmit}>Confirm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-5"></div>
                                    <div class="col-sm-4"></div>
                                    <div class="col-sm-3">

                                    </div>
                                </div>


                            </div>


                        </div>


                    </div>
                    <br/>
                </div>

            </div>


        )


    }
}


const mapStateToProps = state => {
    return {
        applicant_id: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Applied_job_view);

