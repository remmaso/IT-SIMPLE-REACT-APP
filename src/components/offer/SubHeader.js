import React, { Component } from 'react'
import styles from '../../assets/styles/OfferDetails.module.css';

import employmentIcon from "../../assets/icons/b2b.svg";
import experienceIcon from "../../assets/icons/exp.svg";
import timeIcon from "../../assets/icons/time.svg";
import peopleIcon from "../../assets/icons/people.svg"

export default class SubHeader extends Component {

    state = {
        details: null,
        isEditable: false,
        onChange: null,
        fieldState: true,
        placeholder: `   `.concat(` of time`)
    };

    remotePercentageFieldId = "remotePercentageField";

    onChanged = (e) => {
        this.setState({ placeholder: "% of time" })
        this.state.onChange(e.target, e.target.name, e.target.value);
        if (e.target.value) e.target.parentElement.setAttribute('data-value', e.target.value); else e.target.parentElement.removeAttribute('data-value');
    };

    onSwitched = (newState) => {
        let value = this.state.remotePercentage;
        if (!newState) {
            value = 0;
            this.state.onChange(document.getElementById(this.remotePercentageFieldId), "remotePercentage", value);
        }
        this.setState((prevState) => ({
            fieldState: newState,
            details: {
                ...prevState.details,
                remotePercentage: value
            }
        }));
    };

    static getDerivedStateFromProps(props, state) {
        return {
            details: props.details,
            isEditable: props.editable,
            onChange: props.onChange
        }
    }

    render() {
        return <div className={"sub_header"}>
            <div className={"container"}>
                {this.state.isEditable &&
                    <div className={"row " + styles.contract_details}>
                        <div className={"col-4"} style={{paddingLeft:0}}>
                            <div>
                                <div style={{ paddingBottom: '10px' }}>Company size</div>
                                <div><input type={"text"}
                                    value={this.state.details.companySize ? this.state.details.companySize : ""}
                                    className={"company_size"}
                                    name={"companySize"} style={{ borderColor: '#E7ECF3', background: '#fff' }}
                                    placeholder={"Enter company size"}
                                    onChange={e => this.state.onChange(e.target, e.target.name, e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className={"col-4"}>
                            <div style={{ paddingBottom: '10px' }}>Remote available</div>
                            <div className={"row remote_section " + styles.remote_section} >
                                <div className={"col-6"} style={{ display: 'flex', borderColor: '#E7ECF3', background: '#fff', maxWidth: 170 }}>
                                    <div className={"col-6 active " + (this.state.fieldState ? "selected" : "")}
                                        onClick={() => this.onSwitched(true)}>
                                        Yes
                                     </div>
                                    <div className={"col-6 active " + (this.state.fieldState ? "" : "selected")}
                                        onClick={() => this.onSwitched(false)}>
                                        No
                                    </div>
                                </div>
                                <div className={"col input-group"}>
                                    <div data-value="">
                                        <input id={this.remotePercentageFieldId}
                                            type={"text"} style={{ borderColor: '#E7ECF3', background: '#fff', caretColor: '#888E9E' }}
                                            className={"form-control number"}
                                            value={this.state.details.remotePercentage ? this.state.details.remotePercentage : ""}
                                            name={"remotePercentage"}
                                            placeholder={this.state.placeholder}
                                            disabled={!this.state.fieldState}
                                            aria-describedby={"remote-suffix"}
                                            onChange={this.onChanged} />
                                    </div>
                                    {/* <div className={"input-group-append"}>
                                        <span className="input-group-text" id={"remote-suffix"}>%</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!this.state.isEditable &&
                    <div className={"row contract_details"}>
                        <div className={"col-md-2 col-sm-4"}>
                            <div><img src={employmentIcon} alt="" /></div>
                            <div>Employment</div>
                            <div style={{whiteSpace:"pre-line"}}>{
                                this.state.details.salary.map((entry, i) => (
                                    (i > 0 ? "\n" : "") + (entry.type.replace(/\s+/g, "\u00a0"))
                                ))
                            }
                            </div>
                        </div>
                        <div className={"col-md-2 col-sm-4"}>
                            <div><img src={experienceIcon} alt="" /></div>
                            <div>Experience</div>
                            <div
                                style={{ textTransform: "capitalize" }}>{this.state.details.jobExperience.toLowerCase()}</div>
                        </div>
                        <div className={"col-md-2 col-sm-4"}>
                            <div><img src={timeIcon} alt="" /></div>
                            <div>Working hours</div>
                            <div>{"Remote " + (this.state.details.remotePercentage !== null ? this.state.details.remotePercentage : 100) + "% time"}</div>
                        </div>
                        <div className={"col-md-2 col-sm-4"}>
                            <div><img src={peopleIcon} alt="" /></div>
                            <div>Company size</div>
                            <div>{this.state.details.companySize}</div>
                        </div>
                    </div>
                }
            </div>
        </div>;
    }
}
