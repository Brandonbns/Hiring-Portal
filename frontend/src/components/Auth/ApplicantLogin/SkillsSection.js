import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";

const SkillsSection = (props) => {
  const [cv, setCv] = useState();
  const [workExperience, setWorkExperience] = useState("1");
  const [skills, setSkills] = useState();

  const skillSet = [
    { key: "angular", text: "Angular", value: "angular" },
    { key: "css", text: "CSS", value: "css" },
    { key: "design", text: "Graphic Design", value: "design" },
    { key: "ember", text: "Ember", value: "ember" },
    { key: "html", text: "HTML", value: "html" },
    { key: "ia", text: "Information Architecture", value: "ia" },
    { key: "javascript", text: "Javascript", value: "javascript" },
    { key: "mech", text: "Mechanical Engineering", value: "mech" },
    { key: "meteor", text: "Meteor", value: "meteor" },
    { key: "node", text: "NodeJS", value: "node" },
    { key: "plumbing", text: "Plumbing", value: "plumbing" },
    { key: "python", text: "Python", value: "python" },
    { key: "rails", text: "Rails", value: "rails" },
    { key: "react", text: "React", value: "react" },
    { key: "repair", text: "Kitchen Repair", value: "repair" },
    { key: "ruby", text: "Ruby", value: "ruby" },
    { key: "ui", text: "UI Design", value: "ui" },
    { key: "ux", text: "User Experience", value: "ux" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cv);
    console.log(workExperience);
    console.log(skills);
  };

  return (
    <div className="login d-flex align-items-center py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-lg-8 mx-auto">
            <h3 className="login-heading mb-4">need some text</h3>
            <p>need some text</p>
            <form onSubmit={handleSubmit}>
              <div className="custom-file mb-3">
                <input
                  type="file"
                  className="custom-file-input is-invalid"
                  id="validatedCustomFile"
                  required
                  onChange={(e) => setCv(e.target.files[0])}
                />
                <label className="custom-file-label" for="validatedCustomFile">
                  Upload your CV in PDF
                </label>
                <div className="invalid-feedback">Invalid file format</div>
              </div>

              <div className="form-group">
                <label for="work_experience">Work Experience</label>
                <select
                  className="form-control"
                  id="work_experience"
                  onChange={(e) => setWorkExperience(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="form-group">
                <label>Skills</label>
                <Dropdown
                  placeholder="State"
                  fluid
                  multiple
                  search
                  selection
                  options={skillSet}
                  onChange={(e, data) => setSkills(data.value)}
                  onBlur={(e, data) => console.log(data)}
                />
              </div>

              <button
                className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2"
                type="submit"
              >
                Sign Up
              </button>

              <button
                className="btn btn-lg btn-secondary btn-block btn-login text-uppercase font-weight-bold mb-2"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  props.setSection(0);
                }}
              >
                <ChevronLeftIcon />
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
