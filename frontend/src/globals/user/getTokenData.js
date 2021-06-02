import jwt from "jsonwebtoken";
export const getTokenData = (token) => {
  return new Promise((resolve, reject) => {
    if (token) {
      jwt.verify(token, "secretkey", (err, authData) => {
        if (err) {
          console.log(err, "gettoken err");
          localStorage.clear();
          sessionStorage.clear();
          return resolve({
            logedin: false,
            authData: "",
            error: "token error",
          });
        } else if (authData) {
          console.log(authData, "token verified");
          sessionStorage.setItem("authData", authData.authData);

          return resolve({
            logedin: true,
            authData: authData,
            error: "",
          });
        }
      });
    } else {
      return resolve({
        logedin: false,
        authData: "",
        error: "no Token",
      });
    }
  });
};
