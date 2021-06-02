import React, { useState } from "react";
import DetailsSection from "./DetailsSection";
import SkillsSection from "./SkillsSection";

const ApplicantSignup = () => {
  const [section, setSection] = useState(0);
  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          {section === 0 && <DetailsSection setSection={setSection} />}
          {section === 1 && <SkillsSection setSection={setSection} />}
        </div>
      </div>
    </div>
  );
};

export default ApplicantSignup;
