import React, { Component } from "react";
import TextInput from "react-autocomplete-input";
import WorkMethodologyTemplate from "./WorkMethodologyTemplate";
import { AVAILABLE_METHODOLOGIES } from "../../../assets/Const";

import x_square_icon from "../../../assets/icons/x-square.svg"
import trash_icon from "../../../assets/icons/trash.svg"

export default class WorkMethodologyUpdate extends Component {


    createKey = () => {
        return (
            <TextInput options={AVAILABLE_METHODOLOGIES}
                value={this.props.value.key} Component={"input"} placeholder={"Enter methodology name"}
                matchAny={true} spacer={""} trigger={""} minChars={1}
                onChange={(value) => this.props.controller.updateElement(this.props.value, "key", value)} />
        );
    };

    createFlag = () => {
        return (
            <div style={{ border: '1px solid #E7ECF3', textAlign: 'center', display: 'flex', padding: '4px', fontWeight: '700', lineHeight: '45px', background: 'white', borderRadius: '4px', fontSize: 12, height: 53, marginRight: 10 }}>
                <div className={"active " + (this.props.value.flag ? "selected" : "")}
                    onClick={() => this.props.controller.updateElement(this.props.value, "flag", true)} style={{ width: '50%' }}>
                    Yes
                </div>
                <div className={"active " + (this.props.value.flag ? "" : "selected")}
                    onClick={() => this.props.controller.updateElement(this.props.value, "flag", false)} style={{ width: '50%' }}>
                    No
                </div>
            </div>
        );
    }

    createValue = () => {
        return (
            <div style={{ paddingRight: 0, marginLeft: 10 }}>
                <input
                    value={this.props.value.value}
                    name={"value"} placeholder={"eg. Scrum"}
                    onChange={(e) => this.props.controller.updateElement(this.props.value, "value", e.target.value)} />
                {this.props.value.value && <img alt="" src={trash_icon} className={"trash-icon"} onClick={() => { this.props.controller.updateElement(this.props.value, "value", "") }} />}
            </div>
        );
    };

    createDelete = () => {
        return (
            <div className={"col-auto action-col remove"}>
                <div className={"active action-div"} onClick={() => this.props.controller.removeElement(this.props.value)}>
                    <img src={x_square_icon} alt="" />
                </div>
            </div>
        );
    };

    render() {

        return (
            <WorkMethodologyTemplate keyComponent={this.createKey()} valueComponent={this.createValue()} flagComponent={this.createFlag()}
                actionComponent={this.createDelete()} create={false} />
        );
    }
}
