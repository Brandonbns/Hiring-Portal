import React from "react";
import { Carousel } from "react-bootstrap";
import RecruitmentChart from "./RecruitmentChart";
import JobsChart from "./JobsChart";

function AnimationContainer(props) {
  const { applicants, interviews, jobs } = props.states;

  return (
    <div className="animationContainer full">
      <Carousel>
        <Carousel.Item>
          <div className="full">
            {applicants && interviews ? (
              <RecruitmentChart applicants={applicants} />
            ) : null}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="full">
            {applicants && interviews ? <JobsChart jobs={jobs} /> : null}
          </div>
        </Carousel.Item>
        {/* <Carousel.Item>
                    <div className="d-block w-100  padding-left">
                        {applicants && interviews
                            ?
                            <>
                            <ApplicantStats applicants={applicants} interviews={interviews}  />
                            <br/>
                            <InterviewsStats applicants={applicants} interviews={interviews}  />
                            </>
                            :
                            null
                        }
                    </div>

                </Carousel.Item>
                <Carousel.Item>
                    <div className="d-block w-100 padding-left">
                        {applicants && interviews
                            ?
                            <>
                            <JobStats applicants={applicants} interviews={interviews} jobs={jobs} />
                            <br/>
                            <InterviewerStats applicants={applicants} interviews={interviews}  />
                            </>
                            :
                            null
                        }
                    </div>


                </Carousel.Item> */}
      </Carousel>
    </div>
  );
}

export default AnimationContainer;
