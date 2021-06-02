import { getTokenData } from "./getTokenData";

const {
  LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILIURE,
  STORE_COLLECTOR,
  LOG_OUT,
} = require("./userTypes");

const initialState = {
  loading: false,
  logedin: false,
  username: "",
  token: "",
  error: "",
  authData: null,
};

async function getauth() {
  let authdata = await getTokenData(sessionStorage.getItem("token"));
  return authdata;
}

const userReducer = (state = initialState, action) => {
  let authdata = getauth();
  console.log(authdata, "in redux");

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        logedin: true,
        username: sessionStorage.getItem("user"),
        token: sessionStorage.getItem("token"),
        error: "",
        authData: authdata,
      };
    case LOGIN_FAILIURE:
      return {
        ...state,
        loading: false,
        logedin: false,
        username: "",
        token: "",
        error: "not a user",
      };
    case STORE_COLLECTOR:
      return {
        ...state,
        error: "",
        loading: false,
        token: sessionStorage.getItem("token"),
        username: sessionStorage.getItem("user"),
        authData: authdata,
      };
    case LOG_OUT:
      return {
        ...state,
        loading: false,
        token: "",
        username: "",
        logedin: false,
        error: "",
        authData: null,
      };

    default:
      return state;
  }
};
export default userReducer;
