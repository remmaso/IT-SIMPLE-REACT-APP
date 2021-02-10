import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map';

import Logger from "../utils/Logger";
import { getSystemPresentation, isLevel } from "../utils/Utils";

import BackToList from "../components/basic/BackToList";
import NextJob from "../components/offer/NextJob";
import PreviousJob from "../components/offer/PreviousJob";
import EditJobButton from "../components/offer/EditJobButton";
import OfferItem from '../components/offer/OfferItem';

import { DEFAULT_OFFER } from "../components/basic/DEFAULT_OFFER";
import SubHeader from "../components/offer/SubHeader";
import styles from "../assets/styles/OfferDetails.module.css"

import defaultLogo from "../assets/images/jobavatar.png";
import white_list_icon from "../assets/icons/white_list.svg";
import white_map_icon from "../assets/icons/white_map.svg";
import square_checkmark from "../assets/icons/check.svg";
import blue_pin_icon from "../assets/icons/blue_pin.svg";
import checkmark_icon from "../assets/icons/checkmark.svg";
import share_icon from "../assets/icons/share.svg";
import compare_icon from "../assets/icons/compare.svg";
import google_icon from '../assets/images/google-icon.png';
import facebook_icon from '../assets/images/facebook-icon.png';
import linkedin_icon from '../assets/images/linkedin-icon.png';
import github_icon from '../assets/images/github-icon.svg';


class OfferDetailsPage extends Component {

    state = {
        requestedId: null,
        details: DEFAULT_OFFER,
        salaryPosition: -1,
        viewMode: 'list',
        similarOffers: [],
        apply: false
    };

    lastId = null;

    static getDerivedStateFromProps(props, state) {
        Logger.trace("OfferDetails props", props);
        Logger.trace("OfferDetails state", state);
        let requestedId = props.match.params.id;
        if (state.requestedId === requestedId) {
            return {};
        }
        return { requestedId: requestedId };
    }

    componentDidMount() {
        if (this.shouldFetchDetails()) {
            this.fetchDetails(this.state.requestedId);
        }
    }

    shouldFetchDetails() {
        return this.state.requestedId !== this.lastId;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.shouldFetchDetails()) {
            this.fetchDetails(this.state.requestedId);
            // window.scrollTo(0, 0);
        }
    }

    fetchDetails(id) {
        if (!id) {
            return;
        }
        this.lastId = id;
        let requestOptions = {
            method: "POST",
            body: '{"query": "{offers(first: ' + 3 + '){ id jobTitle companyName jobLocation jobAvatar jobExperience salary { type from to currency per } techStack { key } } }"}'
        };
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "offers/" + id)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                let salaryPosition = -1;
                if (data && data.salary && data.salary.length > 0) {
                    salaryPosition = 0;
                }
                this.setState({ details: data, salaryPosition: salaryPosition })
            })
            .catch((e) => Logger.warn(e, this));
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "graphql", requestOptions)
            .then(res => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    similarOffers: (data.data.offers)
                })
            })
            .catch((e) => Logger.warn(e, this));
    }

    switchViewMode() {
        if (this.state.viewMode === 'list') { this.setState({ viewMode: 'map' }) } else { this.setState({ viewMode: 'list' }) }
    }

    loginSuccess() {
        console.log('success');
    }

    loginFailure() {
        console.log('success');
    }

    render() {
        return <div className={ "offer_details readonly" }>
            { this.printHeader() }
            <SubHeader details={ this.state.details } editable={ false } />
            <div className={ "container" }>
                <div className={ "row" } >
                    <div className={ "col-8" } style={ { paddingLeft: 0 } }>
                        { this.printSectionApply(this.state.apply) }
                        { this.printSectionJobDetails(this.state.details) }
                        { this.printSectionTechStack(this.state.details) }
                        { this.printSectionWorkMethodology(this.state.details) }
                        { this.printSectionDailyTasks(this.state.details) }
                        { this.printSectionEquipment(this.state.details) }
                        {/* { this.printSectionJobSpec(this.state.details) } */ }
                        { this.printSectionBenefits(this.state.details.benefits) }
                        { this.printSectionOfficeAmenities(this.state.details.officeAmenities) }
                    </div>
                    { this.printSalaryDetails(this.state.details, this.state.salaryPosition) }
                </div>
                <hr style={ { margin: '50px 0px', borderColor: '#E7ECF3' } } />
                { this.printSectionOthers() }
            </div>
        </div>

    }

    printSalaryDetails(details, salaryPosition) {
        return <div className={ "col-4 content floating " + styles.salary_detail }>
            <div>
                { this.printSalaryAtPosition(details.salary, salaryPosition) }
                { this.printSalarySwitch(details.salary, salaryPosition) }
                { this.printLocation(details) }
                <div className={ "navigation active apply" } onClick={ () => { this.setState({ apply: 'step1' }) } }>
                    <div className={ "row" }>
                        <div className={ "col-auto" }><img src={ checkmark_icon } alt="" /></div>
                        <div className={ "col" }>Apply</div>
                    </div>
                </div>
                <div className={ "col-12 other" }>
                    <div className={ "row" }>
                        <div className={ "active col-lg" }>
                            <div className={ "row active" }>
                                <div className={ "col-auto" }><img src={ share_icon } alt="" /></div>
                                <div className={ "col" }>Share</div>
                            </div>
                        </div>
                        <div className={ "active col-lg" }>
                            <div className={ "row active" }>
                                <div className={ "col-auto" }><img src={ compare_icon } alt="" /></div>
                                <div className={ "col" }>Compare</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    printSalaryAtPosition(salary, salaryPosition) {
        if (!salary || salaryPosition < 0 || salary.length <= salaryPosition) {
            return <div />;
        }
        Logger.trace("printing salary at position " + salaryPosition, salary);
        let currencySymbol = getSymbolFromCurrency(this.state.details.salary[this.state.salaryPosition].currency);
        currencySymbol = currencySymbol ? currencySymbol : this.state.details.salary[this.state.salaryPosition].currency;
        return (
            <div>
                <div className={ "value" }>
                    { this.state.details.salary[this.state.salaryPosition].from + " - " + this.state.details.salary[this.state.salaryPosition].to + " " + currencySymbol }
                </div>
                <div className={ "per" }>
                    { this.state.details.salary[this.state.salaryPosition].type.toLowerCase() === "b2b" &&
                        "+VAT (B2B)"
                    }
                    { this.state.details.salary[this.state.salaryPosition].type.toLowerCase() !== "b2b" &&
                        "gross"
                    } per { this.state.details.salary[this.state.salaryPosition].per }
                </div>
            </div>
        );
    }

    printSalarySwitch(salary, salaryPosition, addAction) {
        if (salary.length === 0 || salary[0].type === "") {
            return;
        }
        return (
            <div className={ "row salary_switch" }>
                { salary.map((entry, i) => (
                    <div key={ "salary_switch_" + i }
                        className={ "col active" + (i === salaryPosition ? " selected" : "") }
                        onClick={ () => this.setState({
                            salaryPosition: i
                        }) }>
                        <div style={ { color: i === salaryPosition ? "#ffffff" : '#888E9E' } }>{ entry.type }</div>
                    </div>
                )) }
            </div>
        )
    }

    printLocation(details) {
        return <div>
            <div className={ "loc_label" }>Location</div>
            <div className={ "loc_value" }>
                <img src={ blue_pin_icon } alt="" style={ { marginRight: 10 } } />{ details.jobLocation ? details.jobLocation.formatted_address : "" }
            </div>
        </div>;
    }

    printHeader() {
        return <div className={ "header" }>
            <div className={ "container" }>
                { this.printNavigation() }
                <div className={ "row" }>
                    <div className={ "fixed logo" }>
                        <img src={ this.state.details.jobAvatar ? this.state.details.jobAvatar : defaultLogo } className={ "fixed logo" } alt={ "Job" } />
                    </div>
                    { this.printJobHeaderDetails(this.state.details) }
                    <div className={ "col" } />
                    <div className={ "" }>
                        <div className={ "list_map" }>
                            <div className={ this.state.viewMode === 'list' ? "selected" : "" } onClick={ () => { this.switchViewMode(); } }>
                                <img src={ white_list_icon } alt={ "" } />
                            </div>
                            <div className={ this.state.viewMode === 'map' ? "selected" : "" } onClick={ () => { this.switchViewMode(); } }>
                                <img src={ white_map_icon } alt={ "" } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    printNavigation() {
        return <div className={ "row" }>
            <div className={ "" }>
                <BackToList />
            </div>
            <div className={ "col" }>
            </div>
            <div className={ "" }>
                <EditJobButton id={ this.state.requestedId } />
            </div>
            <div className={ "" }>
                <PreviousJob id={ this.state.requestedId } />
            </div>
            <div className={ "" }>
                <NextJob id={ this.state.requestedId } />
            </div>
        </div>;
    }

    printJobHeaderDetails(details) {
        return (
            <div className={ "col-7" } style={ { paddingLeft: 30, marginBottom: 30 } }>
                <div className={ "title" }>
                    <div style={ { textOverflow: 'ellipsis', overflow: 'hidden' } }>{ details.jobTitle }</div>
                    <div className={ "experience seniority_" + details.jobExperience.toLowerCase() }>
                        { details.jobExperience.toLowerCase() }
                    </div>
                </div>
                <>
                    <div className={ "sub_title" }>
                        Company: <b>{ details.companyName }</b>
                    </div>
                    <div className={ "sub_title" }>
                        Added: <b>{ details.postingDate }</b>
                    </div>
                </>
            </div>
        )
    }

    printSectionJobDetails(details) {
        return <div className={ "section" }>
            <div className={ "office_image" }>
                <img src={ this.state.details.jobImage } alt={ "Office View" } />
            </div>
            <div className={ "section_header" }>Job Description</div>
            <div style={ { fontStyle: 'normal', fontWeight: '500', fontSize: 16, lineHeight: '160%', color: '#888E9E', whiteSpace: 'pre-line' } } >{ details.jobDescription }</div>

        </div>;
    }

    printSectionTechStack(details) {
        return <div className={ "section" }>
            <div className={ "section_header" }>
                Tech stack
            </div>
            <div className={ "section_body" }>
                <div className={ "row col-12" }>
                    { details.techStack.map((entry, i) => (
                        <div key={ i + "_tech_stack" } >
                            <div className={ "tech_stack" }>
                                <div className={ "row" }>
                                    { [0, 1, 2, 3].map(lvl => (
                                        <div key={ lvl }
                                            className={ "col-3 " + (isLevel(entry.value, lvl) ? "selected" : "") }>
                                            <div>&nbsp;</div>
                                        </div>
                                    )) }
                                </div>
                                <div>{ entry.key }</div>
                                <div>{ entry.value }</div>
                            </div>
                        </div>
                    ))
                    }
                </div>

            </div>
        </div>
    }

    printSectionWorkMethodology(details) {
        return <div className={ "section" }>
            <div className={ "section_header" }>
                Work methodology
                <div style={ { display: 'flex', alignItems: 'center' } }>
                    <div
                        className={ "active " + styles.os_selection + " " + (this.state.includeMethodology ? styles.os_selected : "") }
                        onClick={ () => { this.setState({ includeMethodology: !this.state.includeMethodology }) } }>
                        <div />
                    </div>
                </div>
            </div>
            <div className={ "section_body" }>
                <div className={ "row" }>
                    { details.workMethodology.map((entry, i) => (
                        <div key={ i + "_work_methodology" } className={ "col-12" }>
                            <div className={ "work_methodology" }>
                                <div className={ "row" }>
                                    <div className={ "col-5" }>{ entry.key }</div>
                                    <div className={ "col-7" }>
                                        <img src={ square_checkmark } alt="" />
                                        <span>{ entry.value ? entry.value : "Yes" }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>

            </div>
        </div>;
    }

    printSectionDailyTasks(details) {
        return <div className={ "section" }>
            <div className={ "section_header" }>
                Your daily tasks
            </div>
            <div className={ "section_body" }>
                <div className={ "row col-12" }>
                    { details.dailyTasks.map((entry, i) => (
                        <div key={ i + "_daily_tasks" } className={ "col-12" }>
                            <div className={ "daily_tasks" }>
                                <div className={ "row" }>
                                    <div className={ "col-auto" }>
                                        <div className={ "no" }>{ i + 1 }</div>
                                    </div>
                                    <div className={ "col" }>
                                        { entry }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div>;
    }

    printSectionEquipment(details) {
        var temp = [...details.equipment];
        var index = temp.findIndex(function (p) {
            return p.key === "Operating system"
        });
        if (index >= 0) { temp.splice(index, 1); temp.unshift(details.equipment[index]); }

        return <div className={ "section" }>
            <div className={ "section_header" }>
                Equipment
                <div style={ { display: 'flex', alignItems: 'center' } }>
                    <div
                        className={ "active " + styles.os_selection + " " + (this.state.includeEquipment ? styles.os_selected : "") }
                        onClick={ () => { this.setState({ includeEquipment: !this.state.includeEquipment }) } }>
                        <div />
                    </div>
                </div>
            </div>
            <div className={ "section_body" }>
                <div className={ "row" }>
                    { temp.map((entry, i) => (
                        <div key={ i + "_equipment" } className={ "col-12" }>
                            <div className={ "equipment" }>
                                <div className={ "row simple_pair" }>
                                    <div className={ "col-5" }>{ entry.key }</div>
                                    <div className={ "col-5" }>
                                        { getSystemPresentation(entry.value) }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>

            </div>
        </div>;
    }

    printSectionJobSpec(details) {
        return <div className={ "section" }>
            <div className={ "section_header" }>
                Job specs
            </div>
            <div className={ "section_body" }>
                <div className={ "row" }>
                    { details.jobSpecs.map((entry, i) => (
                        <div key={ i + "_jobSpecs" } className={ "col-12" }>
                            <div className={ "jobSpecs" }>
                                <div className={ "row simple_pair" }>
                                    <div className={ "col-5" }>{ entry.key }</div>
                                    <div className={ "col-5" }>
                                        { entry.value }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>;
    }

    printSectionBenefits(values) {
        if (values.length === 0) {
            return <div />
        }
        return <div className={ "section" }>
            <div className={ "section_header" }>
                { "Benefits" }
            </div>
            <div className={ "section_body" }>
                <div className={ "row col-12" }>
                    { values.map((entry, i) => (
                        <div key={ i } className={ "col-4 extra" }>
                            <img src={ square_checkmark } alt="" />
                            <div>{ entry }</div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    }

    printSectionOfficeAmenities(values) {
        if (values.length === 0) {
            return <div />
        }
        return <div className={ "section" }>
            <div className={ "section_header" }>
                { "Office amenities" }
            </div>
            <div className={ "section_body" }>
                <div className={ "row col-12" }>
                    { values.map((entry, i) => (
                        <div key={ i } className={ "col-4 extra" }>
                            <img src={ square_checkmark } alt="" />
                            <div>{ entry }</div>
                        </div>
                    ))
                    }
                </div>

            </div>
        </div>
    }

    printSectionOthers() {
        return <div className={ "section" } style={ { paddingBottom: 45 } }>
            <div className={ "section_header" }>
                Similar open positions
            </div>
            <div className={ "section_body" } style={ { paddingTop: 0 } }>
                { this.state.similarOffers.length > 0 &&
                    <div style={ { minWidth: '100%' } }>
                        { this.state.similarOffers.map((offer, index) => (
                            <OfferItem jobOffer={ offer } key={ offer.id } index={ index } viewMode={ this.state.viewMode } />
                        )) }
                    </div>
                }
            </div>
        </div>;
    }

    printSectionApply(apply) {
        let div = <div className={ "modal" } style={ { display: (!apply ? "none" : "block") } }
            onClick={ () => hide() }>
            <div className={ "modal-content apply-modal" }>
                <div className={ "title" }>Apply for a job</div>
                <div className={ "sub_title" }>You are applying for - <b style={ { color: '#0C152E' } }>{ this.state.details.jobTitle }</b> at <b style={ { color: '#0C152E' } }>{ this.state.details.companyName }</b></div>
                { this.state.apply === "step1" ? < div className={ "" }>
                    <div className={ "row" }>
                        <div className={ "col-6" } style={ { paddingRight: 5 } }>
                            <div className={ "active login-btn" } onClick={ () => { } }>
                                <img src={ google_icon } alt="" className={ "login-btn-icon" } />Signin with Google
                            </div>
                        </div>
                        <div className={ "col-6" } style={ { paddingLeft: 5 } }>
                            <div className={ "active login-btn" }>
                                <img src={ facebook_icon } alt="" className={ "login-btn-icon" } />Signin with Facebook
                            </div>
                        </div>
                        <div className={ "col-6" } style={ { paddingRight: 5 } }>
                            <div className={ "active login-btn" }>
                                <img src={ linkedin_icon } alt="" className={ "login-btn-icon" } />Signin with Linkedin
                            </div>
                        </div>
                        <div className={ "col-6" } style={ { paddingLeft: 5 } }>
                            <div className={ "active login-btn" }>
                                <img src={ github_icon } alt="" className={ "login-btn-icon" } />Signin with Github
                            </div>
                        </div>
                    </div>
                    <hr className={ "or-line" } />
                    <div className={ "or-txt" }><span>or</span></div>
                    <input className={ "email-input form-control" } placeholder={ "E-mail" } />
                    <input className={ "password-input form-control" } placeholder={ "Password" } />
                    <div className={ "row" }>
                        <div className={ "col-6" } style={ { paddingRight: 5 } } onClick={ () => { this.setState({ apply: "step2" }) } }>
                            <div className={ "active apply-btn" }>
                                Apply without login
                            </div>
                        </div>
                        <div className={ "col-6" } style={ { paddingLeft: 5 } } onClick={ () => { this.setState({ apply: "step2" }) } }>
                            <div className={ "active continue-btn" }>
                                Login and continue
                            </div>
                        </div>
                    </div>
                </div> :
                    <div className={ "" } style={ { marginTop: 30 } }>
                        <div className={ "row" }>
                            <div className={ "col-6" }>
                                <div className={ "title_label" }>Name<span style={ { color: "#EB5928" } }>*</span></div>
                                <input placeholder="" className={ "form-control" } />
                            </div>
                            <div className={ "col-6" }>
                                <div className={ "title_label" }>Last name<span style={ { color: "#EB5928" } }>*</span></div>
                                <input placeholder="" className={ "form-control" } />
                            </div>
                            <div className={ "col-6" }>
                                <div className={ "title_label" }>Online profile<span style={ { color: "#EB5928" } }>*</span></div>
                                <input placeholder="" className={ "form-control" } />
                            </div>
                            <div className={ "col-6" }>
                                <div className={ "title_label" }>CV<span style={ { color: "#EB5928" } }>*</span></div>
                                <input placeholder="Browse files" /*type="file"*/ className={ "form-control file-input" } />
                            </div>
                        </div>
                        <div className={ "title_label" }>Application message</div>
                        <textarea name={ "jobDescription" }
                            rows={ 7 } className={ "form-control" }
                            placeholder={ "Type a few words about you" }
                        >
                        </textarea>
                        <div style={ { display: 'flex', alignItems: 'center' } }>
                            <div
                                className={ "active " + styles.os_selection + " " + (this.state.acceptTC ? styles.os_selected : "") }
                                onClick={ () => { this.setState({ acceptTC: !this.state.acceptTC }) } }>
                                <div />
                            </div>
                            <div className={ "check-txt" }>Accept <a href="/" style={ { color: '#054AFA', textDecoration: 'underline' } }>terms and conditions</a></div>
                        </div>
                        <div style={ { display: 'flex', alignItems: 'center', marginTop: 10 } }>
                            <div
                                className={ "active " + styles.os_selection + " " + (this.state.receiveUpdates ? styles.os_selected : "") }
                                onClick={ () => { this.setState({ receiveUpdates: !this.state.receiveUpdates }) } }>
                                <div />
                            </div>
                            <div className={ "check-txt" }>I would like to receive marketing updates</div>
                        </div>
                        <div className={ "description" }>Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.</div>
                        <div className={ "row" }>
                            <div className={ "col-6" } style={ { paddingRight: 5 } } onClick={ () => { this.setState({ apply: false }) } }>
                                <div className={ "active apply-btn" }>
                                    Cancel
                            </div>
                            </div>
                            <div className={ "col-6" } style={ { paddingLeft: 5 } } onClick={ () => { this.setState({ apply: false }) } }>
                                <div className={ "active continue-btn" }>
                                    Apply
                            </div>
                            </div>
                        </div>
                    </div> }
            </div>
        </div >;

        let hide = () => {
            // this.setState({ apply: false });
        };

        return div;
    }
}

export default withRouter(OfferDetailsPage);
