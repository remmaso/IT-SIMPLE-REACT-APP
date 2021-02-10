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

    addElement = (key, value, flag) => {
        Logger.trace("adding " + key + " with value " + value);
        const workStack = this.props.value;
        workStack.push({key: key, value: value, flag: flag});
        this.props.onChangeHandler(this, this.getCollectionId(), workStack);
    };

    updateElement = (entry, name, value) => {
        const workStack = this.props.value;
        const idx = workStack.indexOf(entry);
        Logger.trace("updating " + idx, entry);
        workStack[idx][name] = value;
        this.props.onChangeHandler(this, this.getCollectionId(), workStack);
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
