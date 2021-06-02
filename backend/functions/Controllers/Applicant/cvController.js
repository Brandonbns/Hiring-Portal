const ResponseService = require("../../common/ResponseService"); // Response service
const Cv = require("../../Models/Applicant/cv"); // cv model
const env = require("../../environment.json");

//upload CV
exports.uploadCv = (req, res) => {
  const url = env.server;
  console.log(url,'url');
  console.log(req.file.filename,'filename');
  Cv.create({
    applicant_id: req.body.applicant_id,
    cv_url: url + "/CVs/" + req.file.filename,
  })
    .then((responce) =>
      ResponseService.generalPayloadResponse(null, responce, res)
    )
    .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};

//update CV
exports.updateCv = (req, res) => {
  const url = env.server;
  const id = req.params.id;
  console.log(url,'url');
  console.log(req.file.filename,'filename');
  Cv.update(
    {
      cv_url: url + "/CVs/" + req.file.filename,
    },
    { where: { applicant_id: id } }
  )
    .then((responce) =>
      ResponseService.generalPayloadResponse(null, responce, res)
    )
    .catch((err) => ResponseService.generalPayloadResponse(err, null, res));
};
