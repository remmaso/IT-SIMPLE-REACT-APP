import React, { Component } from "react";
import Logger from "../../../utils/Logger";
import { CONTRACT_TYPES, CURRENCIES_OPTIONS, PER_OPTIONS } from "../../../assets/Const";
import styles from "../../../assets/styles/OfferDetails.module.css"

import trash_icon from "../../../assets/icons/trash.svg";
export default class SalaryEdit extends Component {

    onChangeHandler = (e) => {
        this.props.onChange(this.props.value, e.target.name, e.target.value);
    };

    render() {
        const options = this.calculateAvailableTypes();
        return (
            <div>
                <div className={"row " + styles.label} style={{ paddingTop: 0 }}>Salary</div>
                <div className={"row"}>
                    <div style={{marginRight:5, width:'calc(50% - 5px)'}} >
                        {/* <div className={"input-group-prepend"}>
                            <span className="input-group-text" style={{ width: 70, justifyContent: 'center' }}>from</span>
                        </div> */}
                        <input type={"text"} value={this.props.value.from} name={"from"}
                            placeholder={"From"}
                            className={"form-control number"}
                            onChange={this.onChangeHandler} />
                    </div>
                    <div style={{marginLeft:5, width:'calc(50% - 5px)'}}>
                        {/* <div className={"input-group-prepend"}>
                            <span className="input-group-text" style={{ width: 70, justifyContent: 'center' }}>to</span>
                        </div> */}
                        <input type={"text"} value={this.props.value.to} name={"to"}
                            placeholder={"To"} className={"form-control number"}
                            onChange={this.onChangeHandler} />
                    </div>
                </div>
                <div className={"row"} style={{ marginTop: "10px" }}>
                    <div className={"col-12 input-group"}>
                        {/* <div className={"input-group-prepend"}>
                            <span className="input-group-text " style={{ width: 70, justifyContent: 'center' }}>per</span>
                        </div> */}
                        <select name={"per"} value={this.props.value.per} required
                            onChange={this.onChangeHandler} className={"form-control"}>
                            {PER_OPTIONS}
                        </select>
                    </div>
                </div>
                <div className={"row " + styles.label}>Currency</div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <select name={"currency"} required
                            value={this.props.value.currency}
                            onChange={this.onChangeHandler}>
                            {CURRENCIES_OPTIONS}
                        </select>
                    </div>
                </div>
                <div className={"row"} style={{ marginTop: 20 }}>
                    <select className={"col"} name={"type"} value={this.props.value.type} required
                        onChange={this.onChangeHandler}>
                        {options}
                    </select>
                    {this.props.salaries.length && this.props.salaries[0].type && <div className={"col-auto active"}
                        onClick={() => this.props.onDelete(this.props.value)} style={{display:'flex'}}>
                            <img src={trash_icon} alt="" style={{ color: "red", lineHeight:'51px' }}/>
                    </div>}
                </div>

            </div>
        );
    }

    calculateAvailableTypes() {
        const salaries = this.props.salaries;
        const usedTypes = [];
        salaries.forEach(salary => {
            if (salary !== this.props.value) {
                usedTypes.push(salary.type);
            }
        });
        Logger.trace("available contracts", usedTypes);
        const availableTypes = [...CONTRACT_TYPES].filter(entry => !usedTypes.includes(entry));
        const options = [<option key={"empty"} value="" disabled hidden>Select contract type</option>];
        availableTypes.forEach((entry) => options.push(<option key={entry} value={entry}>{entry}</option>));
        Logger.trace("available contracts", options);
        return options;
    }

}
