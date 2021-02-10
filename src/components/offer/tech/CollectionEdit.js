import React, {Component} from "react";
import Logger from "../../../utils/Logger";

/**
 *  @abstract
 */
export class CollectionEdit extends Component {


    removeElement = (entry) => {
        const value = this.props.value;
        const idx = value.indexOf(entry);
        Logger.trace("removing " + idx, entry);
        value.splice(idx, 1);
        this.props.onChangeHandler(this, this.getCollectionId(), value);
    };

    addElement = (key, value) => {
        Logger.trace("adding " + key + " with value " + value);
        const techStack = this.props.value;
        techStack.push({key: key, value: value});
        this.props.onChangeHandler(this, this.getCollectionId(), techStack);
    };

    updateElement = (entry, name, value) => {
        const techStack = this.props.value;
        const idx = techStack.indexOf(entry);
        Logger.trace("updating " + idx, entry);
        techStack[idx][name] = value;
        this.props.onChangeHandler(this, this.getCollectionId(), techStack);
    };

    render() {
        return (
            <div>
                {this.props.value &&
                this.props.value.map((entry, i) => this.getUpdate(i, entry))
                }
                {this.getCreate()}
            </div>
        );
    }

    /**
     *  @abstract
     */
    getCollectionId() {
    }

    /**
     *  @abstract
     */
    getCreate() {
    }

    /**
     *  @abstract
     */
    getUpdate(i, entry) {
    }
}
