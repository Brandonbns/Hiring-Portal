import React, { Component } from "react";
import "./interviews.css";
import * as actions from "../../store/actions";

import connect from "react-redux/es/connect/connect";
import ReactPDF from "./react-pdf/ReactPDF";
class Interviews extends Component {
  render() {
    return (
      <div class="grid-container">
        <div class="row">
          {/*<h1>interviews {this.props.applicant_id}</h1>*/}

          {/*<ReactPDF pdf={'http://localhost:5000/CVs/cv-my-cv-(2).pdf'}/>*/}
          {/*<file src="http://localhost:5000/CVs/cv-my-cv-(2).pdf" alt=""/>*/}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Interviews);
