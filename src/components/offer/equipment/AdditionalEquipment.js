import React from "react";

import plus_circle_icon from "../../../assets/icons/plus-circle.svg"
import x_square_icon from "../../../assets/icons/x-square.svg"
import trash_icon from "../../../assets/icons/trash.svg"

export default class AdditionalEquipment extends React.Component {

    state = {
        key: "",
        value: ""
    }

    editEntry = (element, idx) => {
        return <div className={"row stack_row update_row"} key={idx}>
            <div className={"col-5"}>
                <div className={"sub_title"}>Equipment name</div>
                <input
                    value={element.key}
                    placeholder={"e.g. Additional Screens"}
                    name={"entry"}
                    onChange={(e) => this.updateElement(element, 'key', e.target.value)} />
                {element.key && <img alt="" src={trash_icon} className={"trash-icon"} style={{ right: 25, top: 48 }} onClick={() => { this.updateElement(element, 'key', "") }} />}

            </div>
            <div className={"col-6"}>
                <div className={"sub_title"}>Description</div>
                <input
                    value={element.value}
                    placeholder={"e.g. up to 3"}
                    name={"entry"}
                    onChange={(e) => this.updateElement(element, 'value', e.target.value)} />
                {element.value && <img alt="" src={trash_icon} className={"trash-icon"} style={{ right: 25, top: 48 }} onClick={() => { this.updateElement(element, 'value', "") }} />}

            </div>
            <div className={"col-auto action-col remove action"}>
                <div className={"active action-div"} onClick={() => this.removeElement(element)}>
                    <img src={x_square_icon} alt="" />
                </div>
            </div>
        </div>;
    }
    addEntry = () => {
        return <div className={"row stack_row create_row"}>
            <div className={"col-5"}>
                <div className={"sub_title"}>Equipment name</div>
                <input name={"entry"}
                    placeholder={"e.g. Additional Screens"}
                    value={this.state.key}
                    onChange={(e) => {
                        this.setState({ key: e.target.value })
                    }} />
                {this.state.key && <img alt="" src={trash_icon} className={"trash-icon"} style={{ right: 25, top: 48 }} onClick={() => { this.setState({ key: "" }) }} />}

            </div>
            <div className={"col-6"}>
                <div className={"sub_title"}>Description</div>
                <input name={"entry"}
                    placeholder={"e.g. up to 3"}
                    value={this.state.value}
                    onChange={(e) => {
                        this.setState({ value: e.target.value })
                    }} />
                {this.state.value && <img alt="" src={trash_icon} className={"trash-icon"} style={{ right: 25, top: 48 }} onClick={() => { this.setState({ value: "" }) }} />}
            </div>
            <div className={"col-auto action-col add action"}>
                <div className={"active action-div"} onClick={this.addElement}>
                    <img src={plus_circle_icon} alt="" />
                </div>
            </div>
        </div>;
    }

    removeElement = (entry) => {
        let value = this.props.additional;
        let indexOf = value.indexOf(entry);
        value.splice(indexOf, 1);
        this.props.onChange(this, this.props.name, value);
    }

    addElement = () => {
        let value = this.props.additional;
        value.push(this.state);
        this.props.onChange(this, this.props.name, value);
        this.setState({ key: "", value: "" })
    }

    updateElement = (entry, key, elementValue) => {
        let value = this.props.additional;
        let idx = value.indexOf(entry);
        value[idx][key] = elementValue;
        this.props.onChange(this, this.props.name, value);
    }

    render() {

        return <>
            {this.props.additional.map((entry, idx) => this.editEntry(entry, idx))}
            {this.addEntry()}
        </>;
    }
}
