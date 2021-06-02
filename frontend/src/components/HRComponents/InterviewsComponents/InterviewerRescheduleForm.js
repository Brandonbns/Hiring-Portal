import React, { Component } from "react";
import DropdownMultipleSearchSelection from "./DropdownMultipleSearchSelection";
import axios from "axios";
import convertToOptions from "./Modules/convertToOptions";
import {
  DatePickerComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import environment from "../../../environment.json";
axios.defaults.port = 3001;

class InterviewerRescheduleForm extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      interviewerOptions: [],
      date: "",
      dateString: "",
      interviewers: [],
      location: "",
      currentInterview: this.props.interview,
      scheduled: false,
      scheduleDisabled: false,
      readyToSubmit: false,
    };

    this.error = {
      interviewers: "",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
    };
    this.minTime = new Date("1/1/2021 8:00:00");
    this.maxTime = new Date("1/1/2021 20:00:00");
    this.minDate = new Date();
  }
  //********************************************************** Handler Functions ************************************************************* */
  //****************************************************************************************************************************************** */

  // to handle change of date picker
  handleDateChange(Date) {
    if (Date.value) {
      this.error.date = "";
      this.setState({
        date: Date.value,
        dateString: Date.value.toDateString(),
      });
    }
  }

  setStartTime(time) {
    console.log(
      time.value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    if (time.value) {
      this.error.startTime = "";
      this.setState({
        startTime: time.value.toTimeString(),
      });
      console.log(this.state);
    }
  }

  setEndTime(time) {
    console.log(time);
    if (time.value) {
      this.error.endTime = "";
      this.setState({
        endTime: time.value.toTimeString(),
      });
      console.log(this.state);
    }
  }

  //to handle change of dropdown change
  async interviewerChange(event, data) {
    const val = await data.value;
    const selectedArray = [];
    val.forEach((interviewer) => {
      data.options.forEach((option) => {
        if (option.text === interviewer) {
          selectedArray.push({
            interviewerID: option.key,
            Interviewer: interviewer,
            email: option.email,
          });
        }
      });
    });
    if (selectedArray.length !== 0) {
      this.error.interviewers = "";
      this.setState({
        interviewers: selectedArray,
      });
    }
  }

  //to handle location change
  locationChange(event, data) {
    if (data.value) {
      this.error.location = "";
      this.setState({
        location: data.value,
      });
    }
  }

  //change data of interview after Scheduling
  changeData() {
    this.setState({
      scheduled: false,
      scheduleDisabled: false,
    });
  }

  //confirm and send emails
  confirm() {
    if (
      window.confirm(
        "Are you sure you want to schedule and send emails to the interviewers"
      )
    ) {
      axios({
        method: "post",
        url: environment.baseUrl + "/interviews/rescheduleInterview",
        data: {
          interviewers: this.state.interviewers,
          location: this.state.location,
          date: this.state.date,
          interviewID: this.state.currentInterview.interview_id,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
        },
      })
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("change the datails");
    }
  }
  //*************************************************************************************************************** */
  //*************************************************************************************************************** */

  async scheduleInterview() {
    const ready = await this.requiredCheck();
    if (ready) {
      this.setState({
        readyToSubmit: true,
        scheduled: true,
        scheduleDisabled: true,
      });
    } else {
      this.setState({
        readyToSubmit: false,
      });
    }
  }

  requiredCheck() {
    const { interviewers, location, date, startTime, endTime } = this.state;
    interviewers.length === 0
      ? (this.error.interviewers = `interviewers required`)
      : (this.error.interviewers = "");
    !date ? (this.error.date = `date required`) : (this.error.date = "");
    !location
      ? (this.error.location = `location required`)
      : (this.error.location = "");
    !startTime
      ? (this.error.startTime = "Start time is required")
      : (this.error.startTime = "");
    !endTime
      ? (this.error.endTime = "End time is required")
      : (this.error.endtTime = "");
    console.log(this.error, "this.error");
    if (interviewers.length === 0 || !date || !location) return false;
    else return true;
  }

  //**************************************************************************************************************** */
  //making get request to fetch interviewers
  componentDidMount() {
    axios
      .get(environment.baseUrl + "/interviews/interviewers")
      .then((response) => {
        this.setState({
          interviewerOptions: convertToOptions(response),
        });
      })
      .catch((error) => {
        throw error;
      });
  }
  //render functino
  render() {
    var handleDateChange = this.handleDateChange.bind(this);
    const setStartTime = this.setStartTime.bind(this);
    const setEndTime = this.setEndTime.bind(this);
    var interviewerChange = this.interviewerChange.bind(this);
    var locationChange = this.locationChange.bind(this);
    var scheduleInterview = this.scheduleInterview.bind(this);
    var changeData = this.changeData.bind(this);
    var confirm = this.confirm.bind(this);
    var disabled = this.state.scheduleDisabled;
    const locations = [
      {
        key: 1,
        value: "Head Office",
        text: "Head Office",
      },
      {
        key: 2,
        value: "Kolpiti",
        text: "Kolpiti",
      },
    ];

    return (
      <div>
        <div>
          <label className="modal-component" htmlFor="Interviwers">
            Select Interviewers
          </label>
          <DropdownMultipleSearchSelection
            id="interviewers"
            className="modal-component"
            multiple={true}
            options={this.state.interviewerOptions}
            disabled={disabled}
            onChange={interviewerChange}
          />
          <div className="formError">{this.error.interviewers}</div>

          <label htmlFor="Date">Select a Date</label>
          <DatePickerComponent
            className="modal-component"
            placeholder="Select a date"
            onChange={(date) => handleDateChange(date)}
            min={this.minDate}
            disabled={disabled}
            format="yyyy-MM-dd"
          ></DatePickerComponent>
          <div className="formError">{this.error.date}</div>

          <label htmlFor="Date">Select Start time</label>
          <TimePickerComponent
            className="modal-component"
            placeholder="Select start time"
            onChange={(time) => setStartTime(time)}
            min={this.minTime}
            max={this.maxTime}
            disabled={disabled}
            format="HH:mm"
          ></TimePickerComponent>
          <div className="formError">{this.error.startTime}</div>

          <label htmlFor="Date">Select end time</label>
          <TimePickerComponent
            className="modal-component"
            placeholder="Select end time"
            onChange={(time) => setEndTime(time)}
            min={this.minTime}
            max={this.maxTime}
            disabled={disabled}
            format="HH:mm"
          ></TimePickerComponent>
          <div className="formError">{this.error.endTime}</div>

          <label htmlFor="location">Select Location</label>
          <DropdownMultipleSearchSelection
            className="modal-component"
            id="location"
            multiple={false}
            options={locations}
            onChange={locationChange}
            disabled={disabled}
          />
          <div className="formError">{this.error.location}</div>

          <input
            type="button"
            className="modal-component"
            disabled={disabled}
            value="Schedule Interview"
            onClick={scheduleInterview}
          ></input>
        </div>

        <div>
          {
            //if scheduled
            this.state.scheduled ? (
              <div className="scheduled">
                <h1>Interview Status : Scheduled</h1>
                Interview Scheduled on <b>{this.state.dateString}</b> from{" "}
                {new Date(this.state.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                to{" "}
                {new Date(this.state.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                at <b>{this.state.location}</b>
                <br />
                <br />
                the Interviewers are,
                {this.state.interviewers.map((Interviewer) => {
                  return <li>{Interviewer.Interviewer}</li>;
                })}
                <input
                  type="button"
                  value="Change"
                  onClick={changeData}
                ></input>
                <input type="button" value="Confirm" onClick={confirm}></input>
              </div>
            ) : null
            //if not scheduled
          }
        </div>
      </div>
    );
  }
}

export default InterviewerRescheduleForm;
