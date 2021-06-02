import jwt from "jsonwebtoken";
export const getTokenData = (token) => {
  return new Promise((resolve, reject) => {
    console.log(token, "token in get token");
    if (token) {
      jwt.verify(token, "secretkey", (err, authData) => {
        if (err) {
          console.log(err, "gettoken err");
          localStorage.clear();
          return resolve({
            authData: "",
            error: "token error",
          });
        } else if (authData) {
          sessionStorage.setItem("authData", authData.authData);
          console.log("token verified", authData);
          return resolve({
            authData: authData,
            error: "",
          });
        }
      });
    } else {
      return resolve({
        authData: "",
        error: "no Token",
      });
    }
  });
};
