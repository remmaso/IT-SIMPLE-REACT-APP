import React, { Component } from "react";
import Autocomplete from "react-google-autocomplete";
import Logger from "../../../utils/Logger";

export default class GeoSearch extends Component {

    /**
     * When the user types an address in the search box
     * @param place
     */
    onPlaceSelected = (place) => {
        Logger.trace("place", place);
        this.props.onChange(this, this.props.name, place);
    };

    onAlternative = (e) => {
        e.preventDefault();
        let value = e.target.value;
        this.props.onChange(this, this.props.name, { "formatted_address": value });
    }

    render() {

        var street = "";

        if (this.props.value && this.props.value.address_components)

            for (var i = 0; i < this.props.value.address_components.length; i++) {
                var addressType = this.props.value.address_components[i].types[0];
                if (addressType === "street_number") {
                    street = this.props.value.address_components[i]["long_name"].concat(street) + " ";
                }
                if (addressType === "route") {
                    street = street.concat(this.props.value.address_components[i]["long_name"]);
                }
            }
        /* For Auto complete Search Box */
        return <div className={ "col-12" } style={ { padding: 0 } }>
            <Autocomplete
                onPlaceSelected={ this.onPlaceSelected }
                types={ [] }
                defaultValue={ this.props.value ? this.props.name === "userLocation" ? street : this.props.value.formatted_address : "" }
                className={ this.props.className }
            />
            <input className={ "alternative form_error" } type={ "text" }
                value={ this.props.value ? this.props.value.formatted_address : "" }
                name={ "formatted_address" } title={ "No valid Google API key provided" }
                placeholder={ "Enter manually location" }
                onChange={ this.onAlternative } />
        </div>;
    }


}
