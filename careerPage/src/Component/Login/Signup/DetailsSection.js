import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React, { useState } from "react";

const DetailsSection = (props) => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    name: true,
    email: true,
    password: true,
    confPassword: true,
  });
  const setValue = (e) => {
    const { name, value } = e.target;
    setDetails((details) => ({ ...details, [name]: value }));
  };

  const checkValue = (e, option) => {
    const { name, value } = e ? e.target : option;
    let check = true;
    // eslint-disable-next-line default-case
    switch (name) {
      case "name":
        check = value.length >= 3;
        break;
      case "email":
        check =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
            value
          );
        break;
      case "password":
        check = value.length >= 6;
        setErrors((errors) => ({
          ...errors,
          confPassword: !details.confPassword || details.confPassword === value,
        }));
        break;
      case "confPassword":
        check = details.password === value;
        break;
    }
    setErrors((errors) => ({ ...errors, [name]: check }));
    return check;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let proceed = true;
    for (const name in errors) {
      const value = details[name];
      if (!checkValue(null, { name, value })) proceed = false;
    }

    if (proceed) {
      console.log(details);
      props.setSection(1);
    }
  };

  return (
    <div className="login d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-lg-8 mx-auto">
            <h3 className="login-heading mb-4">New here?</h3>
            <p>Sign up to see the opportunities within Arimac!</p>
            <form onSubmit={handleSubmit}>
              <div className="form-label-group">
                <input
                  type="text"
                  id="inputName"
                  name="name"
                  autoFocus
                  className={`form-control ${!errors.name && "is-invalid"}`}
                  placeholder="Name"
                  value={details.name}
                  onChange={setValue}
                  onBlur={checkValue}
                />
                <label htmlFor="inputName">Name</label>
                <div class="invalid-feedback">
                  Name must contain at least 3 characters
                </div>
              </div>

              <div className="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  className={`form-control ${!errors.email && "is-invalid"}`}
                  placeholder="Email address"
                  value={details.email}
                  onChange={setValue}
                  onBlur={checkValue}
                />
                <label htmlFor="inputEmail">Email address</label>
                <div class="invalid-feedback">Invalid Email</div>
              </div>

              <div className="form-label-group">
                <input
                  type="password"
                  id="inputPassword"
                  name="password"
                  className={`form-control ${!errors.password && "is-invalid"}`}
                  placeholder="Password"
                  value={details.password}
                  onChange={setValue}
                  onBlur={checkValue}
                />
                <label htmlFor="inputPassword">Password</label>
                <div class="invalid-feedback">
                  Password must contain at least 6 characters
                </div>
              </div>

              <div className="form-label-group">
                <input
                  type="password"
                  id="inputConfirmPassword"
                  name="confPassword"
                  className={`form-control ${
                    !errors.confPassword && "is-invalid"
                  }`}
                  placeholder="Password"
                  value={details.confPassword}
                  onChange={setValue}
                  onBlur={checkValue}
                />
                <label htmlFor="inputConfirmPassword">Confirm Password</label>
                <div class="invalid-feedback">Password doesn't match</div>
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                  value={details.rememberMe}
                  onChange={(e) =>
                    setDetails((details) => ({
                      ...details,
                      rememberMe: e.target.checked,
                    }))
                  }
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember password
                </label>
              </div>

              <button
                className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                type="submit"
              >
                Next <ChevronRightIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
