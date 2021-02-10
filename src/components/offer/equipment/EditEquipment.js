import React, { Component } from "react";
import SelectOs from "./SelectOs";
import AdditionalEquipment from "./AdditionalEquipment";
import Logger from "../../../utils/Logger";

export default class EditEquipment extends Component {

    render() {
        Logger.trace("EditEquipment", this.props.value);
        let additional = this.getAdditionalEquipment(this.props.value);
        console.log(additional)
        return <>
            <SelectOs value={this.props.value} onChange={this.props.onChange} />
            <AdditionalEquipment value={this.props.value} onChange={this.props.onChange} additional={additional} name="equipment"/>
        </>;
    }

    getAdditionalEquipment(equipments) {
        return equipments.filter(ele => { return ele.key !== "Operating system" })
    }
}
