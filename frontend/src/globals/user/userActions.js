import axios from "axios";

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILIURE,
  STORE_COLLECTOR,
  LOG_OUT,
} = require("./userTypes");

export const login_request = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const login_success = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payLoad: user,
  };
};

export const login_failiure = (error) => {
  return {
    type: LOGIN_FAILIURE,
    payLoad: error,
  };
};

export const storeCollector = () => {
  return {
    type: STORE_COLLECTOR,
  };
};

export const log_out = () => {
  return {
    type: LOG_OUT,
  };
};

export const user_login = (e) => {
  return (dispatch) => {
    dispatch(login_request());
    axios({
      method: "post",
      url: "http://localhost:3001/auth/login",
      data: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    })
      .then((response) => {
        sessionStorage.setItem(
          "login",
          JSON.stringify({
            username: e.target.username.value,
            logedin: true,
          })
        );

        sessionStorage.setItem("token", response.data.token);
        let user = {
          username: e.target.username.value,
          token: response.data.token,
        };
        dispatch(login_success(user));
      })
      .catch((err) => {
        dispatch(login_failiure(err.message));
      });
  };
};
