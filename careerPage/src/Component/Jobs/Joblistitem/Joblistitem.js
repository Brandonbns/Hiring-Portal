import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Joblistitem.css";
import { withRouter } from "react-router";

class Joblistitem extends Component {
  componentDidMount() {}

  render() {
    var date = new Date(this.props.created_at);

    return (
      <div>
        <br />

        <Link className="link textdec" to={`/joblist/${this.props.id}`}>
          <div className="tab-content clearfix container ">
            <div className="row">
              <div className="tm-recommended-place-wrap">
                <div className="tm-recommended-place">
                  <div className="tm-recommended-description-box border-rounded ">
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-8">
                          <h3 className="txtcolorx">{this.props.name}</h3>
                        </div>

                        <div className="col-sm-4">
                          <p className="tm-text-gray"></p>
                        </div>
                      </div>
                    </div>
                    {/*<div className="container">*/}
                    {/*<div className="row">*/}
                    {/*<div className="col-sm-8">*/}
                    {/*<p className="tm-text-highlight"><strong>(LKR) {this.props.salary}</strong></p>*/}
                    {/*</div>*/}

                    {/*<div className="col-sm-4">*/}

                    {/*</div>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="row ">
                            <div className="col-sm">
                              <strong>{date.toLocaleDateString()}</strong>
                            </div>
                            <strong className="col-status">
                              {this.props.status}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(Joblistitem);
