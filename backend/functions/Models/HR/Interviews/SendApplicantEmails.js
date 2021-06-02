var nodemailer = require("nodemailer");
var env = require("../../../environment.json");
module.exports = (data) => {
  console.log(data, "email data");
  const { interviewers, location, date, interview, startTime, endTime } = data;
  console.log(typeof date);
  console.log(new Date(date).toDateString());

  interviewers.forEach((interviewer) => {
    if (interview) {
      let StartTime = new Date(
        0,
        0,
        0,
        ...interview.start_time.split(":")
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      let EndTime = new Date(
        0,
        0,
        0,
        ...interview.end_time.split(":")
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      emailBody = `<p>Dear ${interviewer.Interviewer},<br><br>
      An interview has been scheduled on,<br>
      <b>Date: </b>${new Date(interview.int_date).toDateString} <br>
       <b>Time:</b> ${StartTime}  to ${EndTime} <br>
        <b>Venue: </b>${interview.location}<br><br>
      You are assigned as an interviewer for the above interview. Please log into the hiring portal and confirm your availability on the day. <a href='${
        env.hiring_portal
      }/interviewer/pending'>Click Here</a> to login to Hiring Portal<br><br>
      Best regards,<br>
      Hiring Portal,<br>
      Arimac Lanka<br>
      </p>
      <img style="width:150px;height:150px" src="https://arimaclanka.com/images/logo.png"> 
      `;
    } else {
      let StartTime = new Date(
        0,
        0,
        0,
        ...startTime.split(" ")[0].split(":")
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      let EndTime = new Date(
        0,
        0,
        0,
        ...endTime.split(" ")[0].split(":")
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      let iDate = new Date(date).toDateString();
      emailBody = emailBody = `<p>Dear ${interviewer.Interviewer},<br><br>
      An interview has been scheduled on,<br>
      <b>Date: </b>${iDate} <br>
       <b>Time:</b> ${StartTime}  to ${EndTime} <br>
        <b>Venue: </b>${location}<br><br>
      You are assigned as an interviewer for the above interview. Please log into the hiring portal and confirm your availability on the day. <a href='${env.hiring_portal}/interviewer/pending'>Click Here</a> to login to Hiring Portal<br><br>
      Best regards,<br>
      Hiring Portal,<br>
      Arimac Lanka<br>
      </p>
      <img style="width:150px;height:150px" src="https://arimaclanka.com/images/logo.png"> 
      `;
    }
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hiringportaltest@gmail.com",
        pass: "hiring123",
      },
    });

    var mailOptions = {
      from: "hiringportaltest@gmail.com",
      to: interviewer.email,
      subject: "Request for confirmation on availability for Interview",
      html: emailBody,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error, "error in sending email");
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};
