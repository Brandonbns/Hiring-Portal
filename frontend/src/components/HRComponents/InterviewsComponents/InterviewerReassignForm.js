import React, { Component } from "react";
import DropdownMultipleSearchSelection from "./DropdownMultipleSearchSelection";
import axios from "axios";
import convertToOptions from "./Modules/convertToOptions";
import InterviewerScheduleForm from "./InterviewerScheduleForm";
import environment from "../../../environment.json";

axios.defaults.port = 3001;
class InterviewerReassignForm extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      interviewerOptions: [],
      selectedInterviewers: [],
      interview: this.props.interview,
      interviewers: this.props.interviewers,
      pending: this.props.pending,
      notAvailable: this.props.notAvailable,
      scheduled: false,
      confirmDisabled: false,
    };
  }
  //********************************************************** Handler Functions ************************************************************* */
  //****************************************************************************************************************************************** */
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
      this.setState({
        selectedInterviewers: selectedArray,
      });
    }
  }

  //confirm and send emails
  confirm() {
    if (
      this.state.notAvailable.length > this.state.selectedInterviewers.length
    ) {
      if (
        window.confirm(
          'You are not re-assigning all the unavailable interviewers. Are you sure you want to confirm. or click "Cancel" to reschedule the interview instead by '
        )
      ) {
        if (
          window.confirm(
            "Are you sure you want to schedule and send emails to the interviewers"
          )
        ) {
          this.setState({ confirmDisabled: true });
          axios({
            method: "post",
            url: environment.baseUrl + "/interviews/reassignInterviewers",
            data: {
              interviewers: this.state.selectedInterviewers,
              interview: this.state.interview,
            },
          })
            .then((response) => {})
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("change the datails");
        }
      } else {
        console.log("change details");
      }
    } else {
      if (
        window.confirm(
          "Are you sure you want to schedule and send emails to the interviewers"
        )
      ) {
        this.setState({ confirmDisabled: true });
        axios({
          method: "post",
          url: environment.baseUrl + "/interviews/reassignInterviewers",
          data: {
            interviewers: this.state.selectedInterviewers,
            interview: this.state.interview,
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
  }
  //*************************************************************************************************************** */
  //*************************************************************************************************************** */
  //**************************************************************************************************************** */
  //making get request to fetch interviewers
  componentDidMount() {
    axios({
      method: "post",
      url: environment.baseUrl + "/interviews/getRescheduleInterviewers",
      data: { interview: this.state.interview },
    })
      .then((response) => {
        this.setState({
          interviewerOptions: convertToOptions(response),
        });
        this.forceUpdate();
      })

      .catch((error) => {
        throw error;
      });
  }

  //render functino
  render() {
    var interviewerChange = this.interviewerChange.bind(this);
    var confirm = this.confirm.bind(this);
    var disabled = this.state.confirmDisabled;
    console.log(this.state.interviewerOptions.length, "interviewerOptions");
    return (
      <div>
        {this.state.notAvailable <= this.state.interviewerOptions ? (
          <div>
            <p>
              {this.state.notAvailable.length} interviewer/s have stated they
              are not available on the date. Re-assign{" "}
              {this.state.notAvailable.length} new Interviewer{" "}
            </p>
            <label htmlFor="Interviwers">Select Interviewers</label>
            <DropdownMultipleSearchSelection
              id="interviewers"
              multiple={true}
              options={this.state.interviewerOptions}
              disabled={disabled}
              onChange={interviewerChange}
            />
            <input
              type="button"
              disabled={disabled}
              value="Confirm"
              onClick={confirm}
            ></input>
          </div>
        ) : this.state.interviewerOptions.length === 0 ? (
          <>
            {" "}
            <div>
              <p>
                {this.state.notAvailable.length} interviewer/s have stated they
                are not available on the date. But there're no available
                Interviewer to Re-assign{" "}
              </p>
              {this.state.notAvailable.length >=
              this.state.interviewers.length / 2 ? (
                <p>
                  Most Interviewers has stated <b>"Not-available"</b> Click
                  Reschedule if you want to reschedule the interview
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div>
              <p>
                {this.state.notAvailable.length} interviewer/s have stated they
                are not available on the date. Only{" "}
                {this.state.interviewerOptions.length} interviewers are
                available to be Re-assigned{" "}
              </p>
              <label htmlFor="Interviwers">Select Interviewers</label>
              <DropdownMultipleSearchSelection
                id="interviewers"
                multiple={true}
                options={this.state.interviewerOptions}
                disabled={disabled}
                onChange={interviewerChange}
              />
              {this.state.notAvailable.length >=
              this.state.interviewers.length / 2 ? (
                <p>
                  Most Interviewers has stated <b>"Not-available"</b> Click
                  Reschedule if you want to reschedule the interview
                </p>
              ) : null}
              <input
                type="button"
                disabled={disabled}
                value="Confirm"
                onClick={confirm}
              ></input>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default InterviewerReassignForm;
