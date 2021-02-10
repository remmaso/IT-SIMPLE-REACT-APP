import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { goHome } from "../../utils/Utils";

import leftIcon from "../../assets/icons/arrow_left.svg"

class BackToList extends Component {
    render() {
        return (
            <div className={ "navigation active" } onClick={ (e) => {
                goHome(this, e);
            } } style={{padding:'10px 10px 10px 0px'}}>
                <img src={ leftIcon } alt="" style={{marginRight:10}}/>Go back to list
            </div>
        );
    }
}

export default withRouter(BackToList);
