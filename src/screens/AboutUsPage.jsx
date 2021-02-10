import React, {Component} from "react";
import BackButton from "../components/basic/BackButton";
import { withRouter } from "react-router-dom";

class AboutUsPage extends Component {
    render() {
        return (
            <div className={"container"}>
                <BackButton/>
                <h1>About Us</h1>
            </div>
        );
    }
}

export default withRouter(AboutUsPage)
