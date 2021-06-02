const express = require('express');
const app = express();
const environment = require('./environment.json')
const cors = require('cors');

const dashboard = require("./Routes/HR/Dashboard")
const interviews = require("./Routes/HR/Interviews")
const interviewer = require("./Routes/Interviewer/Interviewer")
const sortApplication = require("./Routes/HR/SortApplication")
const jobs = require("./Routes/HR/Jobs")
const auth = require("./Routes/Auth/auth")
const user = require("./Routes/User/User")
const applicant = require("./Routes/Applicant/route")
const db = require('./config/connection');

app.use("/images", express.static("images"));
app.use("/CVs", express.static("CVs"));
app.use("/public", express.static("public"));

app.set('base', __dirname)
app.use(express.static(__dirname + '/public'))
app.use(cors());
app.use(express.json())




app.use(function (req, res, next) {

  const allowedOrigins = [environment.client1, environment.client2];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
 
app.get("/hello",((req,res)=>{
  res.send('hello');
  res.end();
}));


app.use("/interviews", interviews);
app.use("/interviewer", interviewer);
app.use("/sortapplication", sortApplication);
app.use("/auth", auth)
app.use("/applicant", applicant)
app.use("/user",user )
app.use("/dashboard", dashboard)
app.use("/jobs", jobs)
// require('./Routes/Applicant/route')(app);


const connectingToTheDB = () => {
  db
    .authenticate()
    .then((result) => {
      console.log((`Database Connection has been established successfully with `));
    })
    .catch((error) => {
      console.error(('Unable to connect to the database:', error));
      console.log(`check your MySQL Connection username & password\nEntered username:Check file -  common/database.json`)
    });
};

connectingToTheDB();

app.listen(environment.port);
module.exports = app;

