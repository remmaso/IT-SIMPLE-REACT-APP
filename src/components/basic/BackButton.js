import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { goBack } from "../../utils/Utils";

class BackButton extends Component {
    render() {
        return (
            <div className={"navigation active"} onClick={(e) => {
                goBack(this, e);
            }}>
                <i className="fa fa-long-arrow-left" /> Go back
            </div>
        );
    }
}

export default withRouter(BackButton);
