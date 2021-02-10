import React, { Component } from "react";
// import BackButton from "../components/basic/BackButton";
import { withRouter } from "react-router-dom";


import search_icon from "../assets/icons/search.svg";
import search_white_icon from "../assets/icons/search-white.svg";
import pin_icon from "../assets/icons/pin.svg";
import spin_icon from "../assets/icons/spin.svg";
import browser_icon from "../assets/icons/browse.svg";

import x_circle_icon from "../assets/icons/x-circle.svg";
import save_icon from "../assets/icons/save.svg";
import Logger from "../utils/Logger";

class CompanyDashboardPage extends Component {

  state = {
    companyId: this.props.match.params.id,
    offers: [],
    offerDrafts: [],
    offerTemplates: [],
    offersCount: 0,
    offerDraftsCount: 0,
    offersExpiredCount: 0
  }

  componentDidMount() {
    this.fetchOffersCount();
    this.fetchOffers();
  }

  fetchOffersCount() {
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "/offers/count?status=draft&companyId=" + this.state.companyId)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        this.setState({ offerDraftsCount: data })
      })
      .catch((e) => Logger.warn(e, this));
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "/offers/count?status=expired&companyId=" + this.state.companyId)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        this.setState({ offersExpiredCount: data })
      })
      .catch((e) => Logger.warn(e, this));
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "/offers/count?status=published&companyId=" + this.state.companyId)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        this.setState({ offersCount: data })
      })
      .catch((e) => Logger.warn(e, this));
  }

  fetchOffers() {
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "/offers?status=draft&companyId=" + this.state.companyId)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ offerDrafts: data })
      })
      .catch((e) => Logger.warn(e, this));
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "/offers?status=template&companyId=" + this.state.companyId)
      .then(res => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ offerTemplates: data })
      })
      .catch((e) => Logger.warn(e, this));    
      
    fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "/offers?status=published&companyId=" + this.state.companyId + "")
      .then(res => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ offers: data })
      })
      .catch((e) => Logger.warn(e, this));

  }

  render() {
    return (
      <div className={ "company-dashboard" }>
        { this.printOffersOverview() }
        { this.printOfferTable() }
        { this.printDraftTable() }
        { this.printTemplateTable() }
        <div className={ "action-row" }>
          <div className={ "navigation active cancel" } onClick={ (e) => { } }>
            <img src={ x_circle_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Cancel
          </div>
          <div className={ "navigation active save" } onClick={ (e) => { } }>
            <img src={ save_icon } alt="" style={ { marginRight: 20, /*marginTop: -2*/ } } />Save
          </div>
        </div>
      </div>
    );
  }

  printOffersOverview() {
    return <div className={ "offers-overview" }>
      <div className={ "container section" }>
        <div className={ "section-header" }>Offers Overview</div>
        <div className={ "section-body" }>
          <div className={ "row" }>
            <div className={ "col-4 " }>
              <div className={ "card" }>
                <div className={ "card-title" }>Published offers</div>
                <div className={ "card-content" }>{ this.state.offersCount }</div>
              </div>
            </div>
            <div className={ "col-4 " }>
              <div className={ "card" }>
                <div className={ "card-title" }>Expired offers</div>
                <div className={ "card-content" }>{ this.state.offersExpiredCount }</div>
              </div>
            </div>
            <div className={ "col-4 " }>
              <div className={ "card" }>
                <div className={ "card-title" }>Drafts</div>
                <div className={ "card-content" }>{ this.state.offerDraftsCount }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  }

  printOfferTable() {
    return <div className={ "container" } style={ { marginBottom: 80 } }>
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
      <div className={ "data-table" }>
        <div className={ "table-header" }>
          <div style={ { width: 195 } }>Offer name</div>
          <div style={ { width: 125 } }>Status</div>
          <div style={ { width: 175 } }>Posting date</div>
          <div style={ { width: 180 } }>Expiring date</div>
          <div style={ { width: 160 } }>Created by</div>
          <div style={ { width: 120 } }>Visits</div>
          <div style={ { width: 92 } }>Applications</div>
        </div>
        { this.state.offers.map((offer, index) => (<div className={ "table-body" } key={ index }>
          <div style={ { width: 195 } }>{ offer.jobTitle }</div>
          <div style={ { width: 125 } }>Active</div>
          <div style={ { width: 175 } }>{ offer.postingDate }</div>
          <div style={ { width: 180 } }>2020-04-13</div>
          <div style={ { width: 160 } }>Miłosz Łągwa</div>
          <div style={ { width: 120 } }>240</div>
          <div style={ { width: 92 } }>7</div>
          <div style={ { marginLeft: 'auto' } }><img src={ browser_icon } alt="" /></div>
        </div>)) }

      </div>
    </div>
  }

  printDraftTable() {
    return <div className={ "container section" }>
      <div className={ "section-header" }>Draft offers</div>
      <div className={ "data-table" }>
        <div className={ "table-header" }>
          <div style={ { width: 330 } }>Offer name</div>
          <div style={ { width: 175 } }>Status</div>
          <div style={ { width: 160 } }>Created by</div>
        </div>
        { this.state.offerDrafts.map((offer, index) => (<div className={ "table-body" } key={ index }>
          <div style={ { width: 330 } }>{offer.jobTitle}</div>
          <div style={ { width: 175 } }>Active</div>
          <div style={ { width: 160 } }>Miłosz Łągwa</div>
          <div style={ { marginLeft: 'auto' } }><img src={ browser_icon } alt="" /></div>
        </div>)) }

      </div>
    </div>
  }

  printTemplateTable() {
    return <div className={ "container section" }>
      <div className={ "section-header" }>Offer templates</div>
      <div className={ "data-table" }>
        <div className={ "table-header" }>
          <div style={ { width: 330 } }>Offer name</div>
          <div style={ { width: 160 } }>Created by</div>
        </div>
        { this.state.offerTemplates.map((offer, index) => (<div className={ "table-body" } key={ index }>
          <div style={ { width: 330 } }>{offer.jobTitle}</div>
          <div style={ { width: 160 } }>Miłosz Łągwa</div>
          <div style={ { marginLeft: 'auto' } }><img src={ browser_icon } alt="" /></div>
        </div>)) }
      </div>
    </div>
  }
}

export default withRouter(CompanyDashboardPage);
