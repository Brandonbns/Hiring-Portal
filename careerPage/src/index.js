import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import hp_userpanel_reducer from "./store/reducers/hp_userpanel_reducer";

import { BrowserRouter as Router } from "react-router-dom";
const createBrowserHistory = require("history").createBrowserHistory;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  hp_userpanel_reducer: hp_userpanel_reducer,
  auth: authReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  // <Router history={createBrowserHistory()}>
  <Provider store={store}>
    <App />
  </Provider>,
  // </Router>
  document.getElementById("root")
);
