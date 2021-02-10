import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { goTo } from "../../utils/Utils";

class EditJobButton extends Component {

    goEdit = (e) => {
        goTo(this, e, '/offer/edit/' + this.props.id );
    }

    render() {
        return (
            <div className={"navigation active"} onClick={this.goEdit}>
                <i className="fa fa-edit" /> Edit job
            </div>
        );
    }
}

export default withRouter(EditJobButton);
