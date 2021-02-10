import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import SalaryTags from "./salary/SalaryTags";
import { goTo } from "../../utils/Utils";

import html5_tech from "../../assets/techs/html5.svg";
import css3_tech from "../../assets/techs/css3.svg";
import bitcoin_tech from "../../assets/techs/bitcoin.svg";
import javascript_tech from "../../assets/techs/javascript.svg";
import c_plus_tech from "../../assets/techs/c-plus.svg";

const techs = [html5_tech, css3_tech, bitcoin_tech, javascript_tech, c_plus_tech];

class JobOffer extends Component {

    state = {
        openDetails: false
    };

    openDetails(e, id) {
        goTo(this, e, '/offer/' + id);
    }

    render() {

        let { viewMode, jobOffer, index } = this.props;

        return (
            <div className={"offer-item row active"} key={jobOffer.id}
                onClick={(e) => this.openDetails(e, jobOffer.id)}>
                <div className="logo-div">
                    <img className={"logo"} src={jobOffer.jobAvatar?jobOffer.jobAvatar:"placeholder_office.webp"} alt={"Company logo"} />
                    <img className={"logo-tech"} src={techs[index % 5]} alt="" />
                </div>
                <div className={"col-auto item-left"} style={{ paddingBottom: viewMode === "map" && "19px" }}>
                    <div className={"row"}>
                        <div className={"title"} style={{ maxWidth: viewMode === "map" && '265px' }}>{jobOffer.jobTitle}</div>
                        <div className={"experience seniority_" + jobOffer.jobExperience.toLowerCase()}>
                            {jobOffer.jobExperience.toLowerCase()}
                        </div>
                        {viewMode === 'list' && <SalaryTags tags={jobOffer.salary} />}
                    </div>
                    <div className={"row"}>
                        <div className="location" style={{ maxWidth: viewMode === "map" && '345px' }}>
                            {jobOffer.jobLocation}
                        </div>
                    </div>
                    {jobOffer.salary && jobOffer.salary.length > 0 && viewMode === 'map' &&
                        <div className={"salary row"} style={{ marginTop: 10, marginBottom: 0 }}>
                            {jobOffer.salary[0].from} - {jobOffer.salary[0].to} {jobOffer.salary[0].currency} / {jobOffer.salary[0].per}
                        </div>
                    }
                </div>
                {viewMode === 'list' && <div className="col-lg item-right">
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
                </div>}
            </div>
        )
    }
}

export default withRouter(JobOffer);
