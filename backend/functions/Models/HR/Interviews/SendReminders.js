var nodemailer = require("nodemailer");
var env = require("../../../environment.json");
module.exports = (data) => {
  const { interviewers, interview } = data;
  console.log("sending reminders");

  interviewers.forEach((interviewer) => {
    emailBody = `<p>Dear ${interviewer.full_name},<br><br>
    This is a reminder to confirm your availability since you haven't responded to the previous email/s.<br/>
      An interview has been scheduled on,<br>
      <b>Date: </b>${new Date(interview.int_date).toDateString()} <br>
       <b>Time:</b> ${interview.start_time}  to ${interview.end_time} <br>
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
      subject: "Reminder to confirm availability on Interview",
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
