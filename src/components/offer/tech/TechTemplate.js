import React, { Component } from "react";

export default class TechTemplate extends Component {

    render() {
        return (
            <div className={"row stack_row " + (this.props.create ? "create_row" : "update_row")}>
                <div className={"col-6"}>
                    <div className={"sub_title"}>Technology</div>
                    {this.props.keyComponent}
                </div>
                <div className={"col-5"}>
                    <div className={"sub_title"}>Seniority</div>
                    {this.props.valueComponent}
                </div>
                <div className={"action"}>
                    {this.props.actionComponent}
                </div>
            </div>
        );
    }
}
