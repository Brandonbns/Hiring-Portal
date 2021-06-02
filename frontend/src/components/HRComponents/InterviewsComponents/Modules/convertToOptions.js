const convertToOptions = (optIn) => {
  var options = [];
  optIn.data.forEach((option) => {
    var interviewer = {
      key: option.interviewer_id,
      text: option.full_name,
      value: option.full_name,
      email: option.email,
    };
    options.push(interviewer);
  });
  return options;
};
export default convertToOptions;
