import React, {  useEffect, useState } from "react";
import { connect } from "react-redux";


import { storeCollector } from "../../globals";
import Appbar from "./Appbar";

const IntervieverRoot = (props) => {
  const [InterviewerID, setInterviewerID] = useState(null);
  const [hr, setHr] = useState({ isHr: "", Hr_id: "" });

  useEffect(() => {
    props.storeCollector();
  }, []);

  useEffect(async () => {
    let data = await props.store.authData;
    let interviewer = data.authData.authData.interviewer.interviewer_id;
    let Hr = data.authData.authData.hr;
    setInterviewerID(interviewer);
    setHr(Hr);
  }, [props]);

  return (
    <>
      
        <Appbar InterviewerID={InterviewerID} hr={hr} />
      
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    logedin: state.logedin,
    store: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeCollector: () => dispatch(storeCollector()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntervieverRoot);
