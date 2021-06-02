import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import userStore from "./globals/Store";
import { BrowserRouter as Router } from "react-router-dom";
const createBrowserHistory = require("history").createBrowserHistory;

axios.defaults.headers.common["Authorizarization"] =
  "Bearer " + localStorage.getItem("token");
  

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Provider store={userStore}>
      <App />
    </Provider>
    </Router>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
