export const convertToApplicantData = (data) => {
  var applicantData = [];

  data.data.forEach((applicant) => {
    console.log(applicant, ".................");
    var Applicant = {
      applicant_id: applicant.applicant_id,
      name: applicant.f_name + " " + applicant.l_name,
      f_name: applicant.f_name,
      l_name: applicant.l_name,
      description: applicant.bio,
      skills: applicant.skills ? applicant.skills.split(",") : null,
      email: applicant.email,
      cv: applicant.cv_url,
      work_experience: applicant.work_experience,
      image: applicant.img_url,
      jobs: applicant.jobs,
    };
    applicantData.push(Applicant);
  });

  return applicantData;
};
