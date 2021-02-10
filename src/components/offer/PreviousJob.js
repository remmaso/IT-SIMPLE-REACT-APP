import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { goTo } from "../../utils/Utils";
import Logger from "../../utils/Logger";

import leftArrow from '../../assets/icons/arrow_left.svg'

class PreviousJob extends Component {

    state = {
        previousId: null,
        requestedId: null
    };

    lastId = null;

    static getDerivedStateFromProps(props, state) {
        Logger.trace("getDerivedStateFromProps " + props.id + " : " + state.requestedId, PreviousJob);
        return { requestedId: props.id };
    }

    shouldFetch() {
        return this.state.requestedId !== this.lastId;
    }

    goPrevious = (e) => {
        goTo(this, e, '/offer/' + this.state.previousId);
    };

    componentDidMount() {

        if (this.shouldFetch()) {
            this.fetchPreviousId();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldFetch()) {
            this.fetchPreviousId();
        }
    }

    async fetchPreviousId() {
        if (!this.state.requestedId) {
            return;
        }
        Logger.info("fetching previous " + this.state.requestedId, this);
        let requestOptions = {
            method: "POST",
            body: "{\"query\": \"{previousOfferId(id: \\\"" + this.state.requestedId + "\\\")}\"}"
        };
        this.lastId = this.state.requestedId;
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "graphql", requestOptions)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                Logger.trace("fetched previous " + data.data.previousOfferId, this);
                this.setState({
                    previousId: data.data.previousOfferId
                })
            })
            .catch((e) => Logger.warn(e, this));
    }

    render() {
        if (this.state.previousId) {
            return (
                <div className={ "navigation active" } onClick={ this.goPrevious } style={{padding:'10px 10px 10px 0px'}}>
                    <img src={ leftArrow } alt="" style={ { marginRight: 10 } } />Previous job
                </div>
            );
        }
        return (
            <div className={ "navigation inactive" } style={{padding:'10px 10px 10px 0px'}}>
                <img src={ leftArrow } alt="" style={ { marginRight: 10 } } />Previous job
            </div>
        );
    }
}

export default withRouter(PreviousJob);
