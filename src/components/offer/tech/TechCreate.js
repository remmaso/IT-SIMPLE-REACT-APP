import React, { Component } from "react";
import TextInput from "react-autocomplete-input";
import { AVAILABLE_TECHS, getTechSenioritySelection } from "./TechUpdate";
import TechTemplate from "./TechTemplate";

import plus_circle_icon from "../../../assets/icons/plus-circle.svg";

export default class TechCreate extends Component {

    state = {
        key: "",
        value: ""
    };

    onChange = (key, value) => {
        this.setState({ [key]: value });
    };

    createKey = () => {
        return (
            <TextInput options={AVAILABLE_TECHS}
                value={this.state.key} Component={"input"} placeholder={"Enter technology name"}
                matchAny={true} spacer={""} trigger={""} minChars={1}
                onChange={(value) => this.onChange("key", value)} />
        );
    };

    createValue = () => {
        return (
            <select
                value={this.state.value.toUpperCase()} required
                name={"value"} style={{ borderColor: '#E7ECF3' }}
                onChange={(e) => this.onChange(e.target.name, e.target.value)}>
                {getTechSenioritySelection()}
            </select>
        );
    };

    createAdd = () => {
        return (
            <div className={"col-auto action-col add"}>
                <div className={"active action-div"} onClick={() => {
                    const key = this.state.key;
                    const value = this.state.value;
                    this.props.controller.addElement(key, value);
                    this.setState({ key: "", value: "" });
                }}>
                    <img src={plus_circle_icon} alt="" />
                </div>
            </div>

        );
    }


    render() {
        return (
            <TechTemplate keyComponent={this.createKey()} valueComponent={this.createValue()}
                actionComponent={this.createAdd()} create={true} />
        );
    }
}
