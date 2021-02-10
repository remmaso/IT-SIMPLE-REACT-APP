import React from "react";

import plus_circle_icon from "../../../assets/icons/plus-circle.svg"
import x_square_icon from "../../../assets/icons/x-square.svg"
import trash_icon from "../../../assets/icons/trash.svg"

export class ArrayEdit extends React.Component {

    state = {
        newEntry: ""
    }

    editEntry = (element, idx) => {
        return <div key={idx} className={"stack_row update_row"}>
            <div className={"sub_title"}>Task</div>
            <div className={"row edit-row"} >
                <div className={"col-11"} /*style={{ marginRight: -15, paddingRight: 30 }}*/>
                    <input
                        value={element}
                        placeholder={this.props.placeholder}
                        name={"entry"}
                        onChange={(e) => this.updateElement(element, e.target.value)} />
                    {element && <img alt="" src={trash_icon} className={"trash-icon"} onClick={() => { this.updateElement(element, "") }} />}
                </div>
                <div className={"col-auto action-col remove"}>
                    <div className={"active action-div"} onClick={() => this.removeElement(element)}>
                        <img src={x_square_icon} alt="" />
                    </div>
                </div>
            </div>
        </div>;
    }
    addEntry = () => {
        return <div className={"stack_row create_row"}>
            <div className={"sub_title"}>Task</div>
            <div className={"row"}>
                <div className={"col-11"} /*style={{ marginRight: -15, paddingRight: 30 }}*/>
                    <input name={"entry"}
                        placeholder={this.props.placeholder} value={this.state.newEntry} onChange={(e) => {
                            this.setState({ newEntry: e.target.value })
                        }} />
                    {this.state.newEntry && <img alt="" src={trash_icon} className={"trash-icon"} onClick={() => { this.setState({ newEntry: "" }) }} />}
                </div>
                <div className={"col-auto action-col add"}>
                    <div className={"active action-div"} onClick={this.addElement}>
                        <img src={plus_circle_icon} alt="" />
                    </div>
                </div>
            </div>
        </div>;
    }

    removeElement = (entry) => {
        let value = this.props.value;
        let indexOf = value.indexOf(entry);
        value.splice(indexOf, 1);
        this.props.onChange(this, this.props.name, value);
    }

    addElement = () => {
        let value = this.props.value;
        value.push(this.state.newEntry);
        this.props.onChange(this, this.props.name, value);
        this.setState({ newEntry: "" })
    }

    updateElement = (entry, elementValue) => {
        let value = this.props.value;
        let idx = value.indexOf(entry);
        value[idx] = elementValue;
        this.props.onChange(this, this.props.name, value);
    }

    render() {

        return <>
            {this.props.value.map((entry, idx) => this.editEntry(entry, idx))}
            {this.addEntry()}
        </>;
    }
}
