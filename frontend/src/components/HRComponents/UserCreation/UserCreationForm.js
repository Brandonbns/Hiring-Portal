import axios from "axios";
import React, { useState } from "react";
import { Checkbox, Form, Input, Segment } from "semantic-ui-react";

import environment from "../../../environment.json";

function UserCreationForm() {
  const [fnameError, setFnameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [reqError, setReqError] = useState(false);

  function requiredCheck(e, isError) {
    let { fName, userName, password, email } = e.target;

    if (fName.value === "") {
      setFnameError(true);
      setReqError(true);
    } else setFnameError(false);

    if (userName.value === "") {
      setReqError(true);
      setUsernameError(true);
    } else setUsernameError(false);

    if (email.value === "") {
      setEmailError(true);
      setReqError(true);
    } else setEmailError(false);

    if (password.value === "") {
      setPasswordError(true);
      setReqError(true);
    } else setPasswordError(false);

    return isError();
  }

  function getReqState() {
    if (fnameError || usernameError || emailError || passwordError) {
      return true;
    } else return false;
  }

  async function createUser(e) {
    e.preventDefault();
    let { fName, userName, password, email, interviewer, hr, admin } = e.target;

    requiredCheck(e, getReqState);

    axios({
      method: "post",
      url: environment.baseUrl + "/user/register",
      data: {
        fName: fName.value,
        userName: userName.value,
        email: email.value,
        password: password.value,
        interviewer: interviewer.checked,
        hr: hr.checked,
        admin: admin.checked,
      },
    })
      .then((response) => {
        if (response.status === 250) {
          alert(response.data);
          setBtnDisabled(true);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data, "err");
        }
      });
  }

  return (
    <Segment className="userCreationForm">
      <h4>Create New User</h4>

      <Form onSubmit={createUser}>
        <Input
          id="fName"
          placeholder="Full Name"
          icon="users"
          iconPosition="left"
          error={fnameError}
        />
        <br />
        <br />
        <Input
          id="userName"
          placeholder="UserName"
          icon="user"
          iconPosition="left"
          error={usernameError}
        />
        <br />
        <br />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          icon="key"
          iconPosition="left"
          error={passwordError}
        />
        <br />
        <br />
        <Input
          id="email"
          placeholder="Email"
          icon="mail"
          iconPosition="left"
          error={emailError}
        />
        <br />
        <br />

        <label>Select User Privilages</label>
        <br />
        <Checkbox id="interviewer" label="Interviewer"></Checkbox>
        <br />
        <Checkbox id="hr" label="HR"></Checkbox>
        <br />
        <Checkbox id="admin" label="Admin"></Checkbox>
        <br />
        <br />

        <input
          className="ui button primary"
          value="Create User"
          type="submit"
          disabled={btnDisabled}
        />
      </Form>
    </Segment>
  );
}

export default UserCreationForm;
