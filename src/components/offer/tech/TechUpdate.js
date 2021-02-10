import React, { Component } from "react";
import TextInput from "react-autocomplete-input";
import TechTemplate from "./TechTemplate";

import x_square_icon from "../../../assets/icons/x-square.svg"

export const getTechSenioritySelection = () => {
    return <>
        <option value="" disabled hidden>Select seniority level</option>
        <option value={"JUNIOR"}>Junior</option>
        <option value={"REGULAR"}>Regular</option>
        <option value={"ADVANCED"}>Advanced</option>
        <option value={"MASTER"}>Master</option>
    </>;
};

export const AVAILABLE_TECHS = ["MySQL", "JavaScript", "Unix", "Azure", "BPMN", "Agile", "C#", "Oracle DB", "Oracle", "Phyton", "Scrum", "ISTQB", "Quality Assurance", "PHP", "Java"];

export default class TechUpdate extends Component {


    createKey = () => {
        return (
            <TextInput options={AVAILABLE_TECHS}
                value={this.props.value.key} Component={"input"} placeholder={"Enter technology name"}
                matchAny={true} spacer={""} trigger={""} minChars={1}
                onChange={(value) => this.props.controller.updateElement(this.props.value, "key", value)} />
        );
    };

    createValue = () => {
        return (
            <select
                value={this.props.value.value.toUpperCase()} required
                name={"value"} style={{borderColor:'#E7ECF3'}}
                onChange={(e) => this.props.controller.updateElement(this.props.value, e.target.name, e.target.value)}>
                {getTechSenioritySelection()}
            </select>
        );
    };

    createDelete = () => {
        return (
            <div className={"col-auto action-col remove"}>
                <div className={"active action-div"} onClick={() => this.props.controller.removeElement(this.props.value)}>
                    {/* <i aria-hidden="true" className={"fa fa-times action-icon remove"}></i> */}
                    <img src={x_square_icon} alt=""/>
                </div>
            </div>
        );
    };

    render() {

        return (
            <TechTemplate keyComponent={this.createKey()} valueComponent={this.createValue()}
                actionComponent={this.createDelete()} create={false}/>
        );
    }
}
