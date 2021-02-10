import React, {Component} from "react";
import GeoSearch from "./GeoSearch";
import ReactDependentScript from 'react-dependent-script';

export default class LocationSelect extends Component {

    render() {
        return <ReactDependentScript
            loadingComponent={<div>Initiating Google Cloud Platform</div>}
            scripts={[process.env.REACT_APP_SCRIPT_PROVIDER_URL]}>
            <GeoSearch onChange={this.props.onChange} value={this.props.value} name={this.props.name} className={this.props.className}/>
        </ReactDependentScript>;
    }
}
