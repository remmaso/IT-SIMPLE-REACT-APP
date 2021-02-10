import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { goTo } from "../../utils/Utils";
import Logger from "../../utils/Logger";

import rightArrow from '../../assets/icons/arrow_right.svg'

class NextJob extends Component {

    state = {
        nextId: null,
        requestedId: null
    };

    lastId = null;

    goNext = (e) => {
        goTo(this, e, '/offer/' + this.state.nextId);
    };

    static getDerivedStateFromProps(props, state) {
        Logger.trace("getDerivedStateFromProps " + props.id + " : " + state.requestedId, NextJob);
        return { requestedId: props.id };
    }

    shouldFetch() {
        return this.state.requestedId !== this.lastId;
    }

    componentDidMount() {

        if (this.shouldFetch()) {
            this.fetchNextId();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldFetch()) {
            this.fetchNextId();
        }
    }

    fetchNextId() {
        if (!this.state.requestedId) {
            return;
        }
        this.lastId = this.state.requestedId
        let requestOptions = {
            method: "POST",
            body: "{\"query\": \"{nextOfferId(id: \\\"" + this.state.requestedId + "\\\")}\"}"
        };
        Logger.info("fetching next " + this.state.requestedId, this);
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "graphql", requestOptions)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    nextId: data.data.nextOfferId
                })
            })
            .catch((e) => Logger.warn(e, this));
    }

    render() {
        if (this.state.nextId) {
            return (
                <div className={ "navigation active" } onClick={ this.goNext } style={ { padding: '10px 0px 10px 10px' } }>
                    Next job<img src={ rightArrow } alt="" style={ { marginLeft: 10 } } />
                </div>
            );
        }
        return (
            <div className={ "navigation inactive" }  style={ { padding: '10px 0px' } }>
                Next job<img src={ rightArrow } alt="" style={ { marginLeft: 10 } } />
            </div>
        );
    }
}

export default withRouter(NextJob);
