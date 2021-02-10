import React, {Component} from 'react'
import {withRouter} from "react-router-dom";

import SalaryTags from "./salary/SalaryTags";
import {goTo} from "../../utils/Utils";

class JobOffer extends Component {

    state = {
        openDetails: false
    };

    openDetails(e, id) {
        goTo(this, e, '/offer/' + id);
    }

    render() {
        let jobOffer = this.props.jobOffer;
        console.log(jobOffer)
        return (
            <div key={jobOffer.id}>
                <div className={"offer-item row active"}
                     onClick={(e) => this.openDetails(e, jobOffer.id)}>
                    <div className="col-1">
                        <img className={"logo"} src={jobOffer.jobAvatar?jobOffer.jobAvatar:"placeholder_office.webp"} alt={"Company logo"}/>
                    </div>
                    <div className={"col-auto"}>
                        <div className={"row"}>
                            <div className={"title"}>{jobOffer.jobTitle}</div>
                            <div className={"experience seniority_" + jobOffer.jobExperience.toLowerCase()}>
                                {jobOffer.jobExperience}
                            </div>
                            <SalaryTags tags={jobOffer.salary}/>
                        </div>
                        <div className={"row"}>
                            <div className="location">
                                {jobOffer.jobLocation}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg">
                        <div className={"row justify-content-end"}>
                            <div className={"col-auto"}>
                                {jobOffer.salary && jobOffer.salary.length > 0 &&
                                <div className={"salary"}>
                                    {jobOffer.salary[0].from} - {jobOffer.salary[0].to} {jobOffer.salary[0].currency} / {jobOffer.salary[0].per}
                                </div>
                                }
                            </div>
                        </div>
                        <div className={"row justify-content-end skills"}>
                            {jobOffer.techStack && jobOffer.techStack.length > 0 &&
                            jobOffer.techStack.map((tech) => (
                                <div className={"col-auto"} key={tech.key}>{tech.key}</div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(JobOffer);
