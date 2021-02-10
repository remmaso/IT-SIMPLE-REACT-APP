import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom';
import { compose, withProps } from "recompose"

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

// import JobOffer from "../components/offer/JobOffer";
import Logger from "../utils/Logger";

import search_icon from "../assets/icons/search.svg";
import search_white_icon from "../assets/icons/search-white.svg";
import pin_icon from "../assets/icons/pin.svg";
import spin_icon from "../assets/icons/spin.svg";
import white_sun_icon from "../assets/icons/white_sun.svg";
import white_moon_icon from "../assets/icons/white_moon.svg";
import gray_sun_icon from "../assets/icons/gray_sun.svg";
import gray_moon_icon from "../assets/icons/gray_moon.svg";
import white_list_icon from "../assets/icons/white_list.svg";
import white_map_icon from "../assets/icons/white_map.svg";
import gray_list_icon from "../assets/icons/gray_list.svg";
import gray_map_icon from "../assets/icons/gray_map.svg";

import { FILTER_OPTION } from '../assets/Const';
import OfferItem from '../components/offer/OfferItem';


import html5_tech from "../assets/techs/html5.svg";
import css3_tech from "../assets/techs/css3.svg";
import bitcoin_tech from "../assets/techs/bitcoin.svg";
import javascript_tech from "../assets/techs/javascript.svg";
import c_plus_tech from "../assets/techs/c-plus.svg";

const techs = [html5_tech, css3_tech, bitcoin_tech, javascript_tech, c_plus_tech];
const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBM-uKsYWeSiOXFEA-ZV-mLk395l4I3tMc&libraries=geometry,drawing,places",
        loadingElement: <div style={ { height: `100%` } } />,
        containerElement: <div style={ { height: `calc(100vh - 140px)`, position: 'sticky', top: '120px' } } />,
        mapElement: <div style={ { height: `100%` } } />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={ 7 }
        center={ { lat: 51.9194, lng: 19.1451 } }
    >
        { props.offers && props.offers.map((offer, index) =>
            <Marker position={ { lat: offer.jobLocationLat, lng: offer.jobLocationLng } }
                icon={ { url: techs[index % 5], scaledSize: { width: 38, height: 38 } } } onClick={ () => props.onMarkerClick(index) } key={ offer.id }>
                { (props.showInfoIndex === index) && <InfoWindow onCloseClick={ ()=>props.onMarkerClick(undefined) }>
                    <div>{ offer.jobTitle }</div>
                </InfoWindow> }
            </Marker>
        ) }
    </GoogleMap>
);
class HomePage extends Component {

    state = {
        offers: [],
        loading: false,
        hasNext: false,
        pageLength: -1,
        withNext: true,
        colorMode: 'light',
        viewMode: 'list'
    };

    static getDerivedStateFromProps(props, state) {
        return {
            pageLength: state.pageLength < 0 && props.pageLength ? props.pageLength : 10,
            withNext: state.pageLength < 0 && props.pageLength ? false : state.withNext
        }
    }

    fetchNext() {
        let requestOptions = {
            method: "POST",
            body: '{"query": "{offers(skip: ' + this.state.offers.length + ', first: ' + this.state.pageLength + '){ id jobTitle companyName jobLocation jobLocationLat jobLocationLng jobAvatar jobExperience salary { type from to currency per } techStack { key } } }"}'
        };
        this.setState({
            loading: true,
            hasNext: false
        });
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "graphql", requestOptions)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data.data.offers)
                this.setState({
                    offers: this.state.offers.concat(data.data.offers),
                    loading: false,
                    hasNext: data.data.offers.length === this.state.pageLength
                })
            })
            .catch((e) => Logger.warn(e, this));
    }

    componentDidMount() {

        if (!this.state.loading) {
            this.fetchNext();
        }
    }

    switchColorMode() {
        if (this.state.colorMode === 'light') { this.setState({ colorMode: 'dark' }) } else { this.setState({ colorMode: 'light' }) }
    }

    switchViewMode() {
        if (this.state.viewMode === 'list') { this.setState({ viewMode: 'map' }) } else { this.setState({ viewMode: 'list' }) }
    }

    handleMarkerClick = (id) => {
        this.setState({ selectedMarker: id })
    }

    render() {
        return (
            <div className="container home-page">
                <div className={ "search-bar row" }>
                    <div className={ "col-6 keyword" }>
                        <img src={ search_icon } alt="" className={ "search-icon" } />
                        <input placeholder={ "What are you looking for?" } className={ "keyword-input" }></input>
                    </div>
                    <div className={ "col-6 location" }>
                        <div className={ "location-input" }>
                            <img src={ pin_icon } alt="" className={ "pin-icon" } />
                            <input placeholder={ "Las Vegas" } ></input>
                            <img src={ spin_icon } alt="" className={ "spin-icon" } />
                        </div>
                        <div className={ "active search-btn" }>
                            <img src={ search_white_icon } alt="" className={ "search-icon" } />
                            Search a job
                        </div>
                    </div>
                </div>
                <div className={ "row filter-bar" }>
                    <select name={ "per" } required defaultValue=""
                        onChange={ this.onChangeHandler } className={ "form-control category" }>
                        <option value="" data-default hidden>Category</option>
                        { FILTER_OPTION }
                    </select>
                    <select name={ "per" } required defaultValue=""
                        onChange={ this.onChangeHandler } className={ "form-control technology" }>
                        <option value="" data-default hidden>Technology</option>
                        { FILTER_OPTION }
                    </select>
                    <select name={ "per" } required defaultValue=""
                        onChange={ this.onChangeHandler } className={ "form-control salary" }>
                        <option value="" data-default hidden>Salary</option>
                        { FILTER_OPTION }
                    </select>
                    <select name={ "per" } required
                        onChange={ this.onChangeHandler } className={ "form-control level" }>
                        <option value="" data-default hidden>Level</option>
                        { FILTER_OPTION }
                    </select>
                    <select name={ "per" } required defaultValue=""
                        onChange={ this.onChangeHandler } className={ "form-control location" }>
                        <option value="" data-default hidden>Location</option>
                        { FILTER_OPTION }
                    </select>
                    <select name={ "per" } required defaultValue=""
                        onChange={ this.onChangeHandler } className={ "form-control details" }>
                        <option value="" data-default hidden>Details</option>
                        { FILTER_OPTION }
                    </select>
                    <select name={ "per" } required defaultValue=""
                        onChange={ this.onChangeHandler } className={ "form-control contract" }>
                        <option value="" data-default hidden>Contract</option>
                        { FILTER_OPTION }
                    </select>
                    <div className={ "light-dark" }>
                        <div className={ this.state.colorMode === 'light' ? "selected" : "" } onClick={ () => { this.switchColorMode(); } }>
                            <img src={ this.state.colorMode === 'light' ? white_sun_icon : gray_sun_icon } alt={ "" } />
                        </div>
                        <div className={ this.state.colorMode === 'dark' ? "selected" : "" } onClick={ () => { this.switchColorMode(); } }>
                            <img src={ this.state.colorMode === 'light' ? gray_moon_icon : white_moon_icon } alt={ "" } />
                        </div>
                    </div>
                    <div className={ "list-map" }>
                        <div className={ this.state.viewMode === 'list' ? "selected" : "" } onClick={ () => { this.switchViewMode(); } }>
                            <img src={ this.state.viewMode === 'list' ? white_list_icon : gray_list_icon } alt={ "" } />
                        </div>
                        <div className={ this.state.viewMode === 'map' ? "selected" : "" } onClick={ () => { this.switchViewMode(); } }>
                            <img src={ this.state.viewMode === 'list' ? gray_map_icon : white_map_icon } alt={ "" } />
                        </div>
                    </div>
                </div>
                <div style={ { display: 'flex' } }>
                    { this.state.offers.length > 0 &&
                        <div style={ { minWidth: this.state.viewMode === 'map' ? '440px' : '100%' } }>
                            { this.state.offers.map((offer, index) => (
                                <OfferItem jobOffer={ offer } key={ offer.id } index={ index } viewMode={ this.state.viewMode } />
                            )) }
                        </div>
                    }
                    { this.state.viewMode === "map" &&
                        <div className={ "map-view" }>
                            <MyMapComponent
                                isMarkerShown={ this.state.isMarkerShown }
                                onMarkerClick={ this.handleMarkerClick }
                                offers={ this.state.offers }
                                showInfoIndex={this.state.selectedMarker}
                            />
                        </div>
                    }
                </div>
                { this.state.hasNext && this.state.withNext &&
                    <div className={ "next active" } onClick={ (e) => this.fetchNext() } style={ { margin: '0 -15px 20px', width: this.state.viewMode === "map" && '470px' } }>
                        Load more
                    </div>
                }
                { this.state.loading &&
                    <div className={ "loader" }>
                        <Loader height={ 100 } width={ 100 } type={ "Grid" }
                            color={ "#054AFA" } />
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(HomePage)
