import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import "react-pro-sidebar/dist/css/styles.css";
import { storeCollector } from "../../globals";
import Appbar from "./Appbar";

function Root(props) {
  const [authData, setAuthData] = useState(props.store.authData);

  useEffect(async () => {
    console.log("roott");
    let authdata = await props.store.authData;
    setAuthData(authdata);
  }, [props]);

  return (
    <div id="hrRoot">
      <Appbar authData={authData}></Appbar>
    </div>
  );
}
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

export default connect(mapStateToProps, mapDispatchToProps)(Root);
