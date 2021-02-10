import React, { Component } from "react";
import TextInput from "react-autocomplete-input";
import WorkMethodologyTemplate from "./WorkMethodologyTemplate";
import { AVAILABLE_METHODOLOGIES } from "../../../assets/Const";

import plus_circle_icon from "../../../assets/icons/plus-circle.svg"
import trash_icon from "../../../assets/icons/trash.svg"

export default class WorkMethodologyCreate extends Component {

    state = {
        key: "",
        value: "",
        flag: true
    };

    onChange = (key, value) => {
        this.setState({ [key]: value });
    };

    onSwitched = (newState) => {
        this.setState({
            flag: newState
        });
    };

    createKey = () => {
        return (
            <TextInput options={AVAILABLE_METHODOLOGIES}
                value={this.state.key} Component={"input"} placeholder={"Enter methodology name"}
                matchAny={true} spacer={""} trigger={""} minChars={1}
                onChange={(value) => this.onChange("key", value)} />
        );
    };

    createFlag = () => {
        return (
            <div style={{ border: '1px solid #E7ECF3', textAlign: 'center', display: 'flex', padding: '4px', fontWeight: '700', lineHeight: '45px', background: 'white', borderRadius: '4px', fontSize: 12, height: 53}}>
                <div className={"active " + (this.state.flag ? "selected" : "")}
                    onClick={() => this.onSwitched(true)} style={{ width: '50%' }}>
                    Yes
                    </div>
                <div className={"active " + (this.state.flag ? "" : "selected")}
                    onClick={() => this.onSwitched(false)} style={{ width: '50%' }}>
                    No
                    </div>
            </div>
        );
    };

    createValue = () => {
        return (
            <div style={{ paddingRight: 0, marginLeft:10 }}>
                <input
                    value={this.state.value}
                    name={"value"} placeholder={"eg. Scrum"}
                    onChange={(e) => this.onChange(e.target.name, e.target.value)} />
                {this.state.value && <img alt="" src={trash_icon} className={"trash-icon"} onClick={() => { this.setState({ value: "" }) }} />}
            </div>
        );
    };

    createAdd = () => {
        return (
            <div className={"col-auto action-col add"}>
                <div className={"active action-div"} onClick={() => {
                    const key = this.state.key;
                    const value = this.state.value;
                    const flag = this.state.flag;
                    this.props.controller.addElement(key, value, flag);
                    this.setState({ key: "", value: "", flag: true });
                }}>
                    <img src={plus_circle_icon} alt="" />
                </div>
            </div>
        );
    }


    render() {
        return (
            <WorkMethodologyTemplate keyComponent={this.createKey()} valueComponent={this.createValue()} flagComponent={this.createFlag()}
                actionComponent={this.createAdd()} create={true} />
        );
    }
}

