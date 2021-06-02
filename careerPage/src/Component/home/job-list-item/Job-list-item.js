import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withRouter } from "react-router";

class Job_List_Item extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <br />

        <Link className="link textdec" to={`/joblist/${this.props.id}`}>
          <div>
            <div className="single-job-items mb-30   rounded">
              <div className="job-items">
                <div className="job-tittle job-tittle2">
                  <a href="#">
                    <h4>{this.props.name}</h4>
                  </a>
                  <ul>
                    <li>{this.props.skills}</li>
                    {/*<li><i className="fas fa-map-marker-alt"></i>Athens, Greece</li>*/}
                  </ul>
                </div>
              </div>
              <div className="items-link items-link2 f-right">
                <a href="job_details.html">LKR{this.props.salary}</a>
                <span>Dead Line : {this.props.deadline}</span>
              </div>
            </div>
            {this.props.time}
          </div>
        </Link>
      </div>
    );
  }
}

export default Job_List_Item;
