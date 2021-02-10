import React, { Component } from "react";

export default class WorkMethodologyTemplate extends Component {

    render() {
        return (
            <>
                <div className={"row stack_row " + (this.props.create ? "create_row" : "update_row")}>
                    <div className={"sub_title col-12"}>Methodology</div>
                    <div className={"col-5"} style={{maxWidth:244}}>
                        {this.props.keyComponent}
                    </div>
                    <div className={"col-3"} style={{paddingRight:0, maxWidth:170}}>
                        {this.props.flagComponent}
                    </div>
                    <div className={"col"} style={{paddingLeft:0}}>
                        {this.props.valueComponent}
                    </div>
                    <div className={"action"}>
                        {this.props.actionComponent}
                    </div>
                </div>
            </>
        );
    }
}
