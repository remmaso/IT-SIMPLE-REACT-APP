import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { goAddOffer, goHome, goTo, loginStatus } from "../../utils/Utils";

import user_icon from "../../assets/icons/user.svg";
import red_user_icon from "../../assets/icons/red-user.svg";
import building_icon from "../../assets/icons/building.svg";
import xIcon from "../../assets/icons/x.svg";
import { fireAuth } from '../../utils/FirebaseConfig';

class Header extends Component {

    goHome = (e) => {
        goHome(this, e);
    };

    goCompanies = (e) => {
        goTo(this, e, '/companies');
    };

    goAboutUs = (e) => {
        goTo(this, e, '/aboutUs');
    };

    goLogin = (e) => {
        goTo(this, e, '/login');
    }

    goLoginEmployer = (e) => {
        goTo(this, e, '/login_employer');
    }

    goProfile = (e) => {
        goTo(this, e, '/user/profile');
    }

    goCompanyProfile = (e) => {
        goTo(this, e, '/company/profile');
    }

    logOut = (e) => {
        fireAuth.signOut();
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        goTo(this, e, '/');
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        return (
            <div className={ "top" }>
                <div className={ "container" }>
                    <div className={ "row" }>
                        <div className={ "col-2 logo" } onClick={ this.goHome }>
                            ITSimple-Test
                        </div>
                        <div className="col-lg-5 col-md-3 col-sm-8 menu">
                            <div className="row">
                                <div className={ "col-lg" }>
                                    <div className={ "active btn" } onClick={ this.goHome }>Job Offers</div>
                                </div>
                                <div className={ "col-lg" }>
                                    <div className={ "active btn" } onClick={ this.goCompanies }>Companies</div>
                                </div>
                                <div className={ "col-lg" }>
                                    <div className={ "active btn" } onClick={ this.goAboutUs }>About Us</div>
                                </div>
                            </div>
                        </div>
                        <div className={ "col-lg-5 col-md-7 col-sm-12 user_preference" }>
                            <div className="row justify-content-end">
                                <div className={ "col-auto active" }>
                                    <div>For Employers</div>
                                </div>
                                <div className={ "fixed icon active" } style={ { border: 'unset' } }>
                                    <div className={ "dropdown-toggle user_btn" } data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={ user && user.photoUrl ? user.photoUrl : user_icon } alt="" style={ user && user.photoUrl && { width: 40, height: 40, borderRadius: '50%' } } />
                                    </div>
                                    <ul className={ "dropdown-menu dropdown-menu-right user_dropdown" }>
                                        { !loginStatus() ? <><li className={ "dropdown-item" } style={ { display: 'flex', height: 77, padding: 20 } } onClick={ this.goLoginEmployer }>
                                            <img src={ building_icon } alt="" />
                                            <div style={ { marginLeft: 20 } }>
                                                <div>
                                                    <span style={ { fontWeight: 'bold', fontSize: 14, lineHeight: '140%', color: '#0C152E' } }>Log in to Employer Panel</span>
                                                </div>
                                                <div>
                                                    <span style={ { fontWeight: '500', fontSize: 14, lineHeight: '17px', color: '#888E9E' } }>Manage job offers and check conversion rate</span>
                                                </div>
                                            </div>
                                        </li>
                                            <hr style={ { margin: 0 } } />
                                            <li className={ "dropdown-item" } style={ { display: 'flex', height: 77, padding: 20 } } onClick={ this.goLogin }>
                                                <img src={ red_user_icon } alt="" />
                                                <div style={ { marginLeft: 20 } }>
                                                    <div>
                                                        <span style={ { fontWeight: 'bold', fontSize: 14, lineHeight: '140%', color: '#0C152E' } }>Log in as a Candidate</span>
                                                    </div>
                                                    <div>
                                                        <span style={ { fontWeight: '500', fontSize: 14, lineHeight: '17px', color: '#888E9E' } }>Find the best job faster</span>
                                                    </div>
                                                </div>
                                            </li></> : loginStatus() === "candidate" ? <>
                                                <li className={ "dropdown-item" } style={ { display: 'flex', height: 77, padding: 20, alignItems: 'center' } } onClick={ this.goProfile }>
                                                    <img src={ red_user_icon } alt="" />
                                                    <div style={ { marginLeft: 20 } }>
                                                        <div>
                                                            <span style={ { fontWeight: 'bold', fontSize: 14, lineHeight: '140%', color: '#0C152E' } }>My profile</span>
                                                        </div>
                                                        <div>
                                                            <span style={ { fontWeight: '500', fontSize: 14, lineHeight: '17px', color: '#888E9E' } }>Manage your profile</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <hr style={ { margin: 0 } } />
                                                <li className={ "dropdown-item" } style={ { display: 'flex', height: 77, padding: 20, alignItems: 'center' } } onClick={ this.logOut }>
                                                    <div className={ "log-out" }>
                                                        <img src={ xIcon } alt="" />
                                                    </div>
                                                    <div style={ { marginLeft: 20 } }>
                                                        <div>
                                                            <span style={ { fontWeight: 'bold', fontSize: 14, lineHeight: '140%', color: '#0C152E' } }>Log out</span>
                                                        </div>
                                                        <div>
                                                            <span style={ { fontWeight: '500', fontSize: 14, lineHeight: '17px', color: '#888E9E' } }>Log out from ITSimple-Test</span>
                                                        </div>
                                                    </div>
                                                </li></> : <>
                                                    <li className={ "dropdown-item" } style={ { display: 'flex', height: 77, padding: 20, alignItems: 'center' } } onClick={ this.goCompanyProfile }>
                                                        <img src={ building_icon } alt="" />
                                                        <div style={ { marginLeft: 20 } }>
                                                            <div>
                                                                <span style={ { fontWeight: 'bold', fontSize: 14, lineHeight: '140%', color: '#0C152E' } }>My profile</span>
                                                            </div>
                                                            <div>
                                                                <span style={ { fontWeight: '500', fontSize: 14, lineHeight: '17px', color: '#888E9E' } }>Manage company profile</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <hr style={ { margin: 0 } } />
                                                    <li className={ "dropdown-item" } style={ { display: 'flex', height: 77, padding: 20, alignItems: 'center' } } onClick={ this.logOut }>
                                                        <div className={ "log-out" }>
                                                            <img src={ xIcon } alt="" />
                                                        </div>
                                                        <div style={ { marginLeft: 20 } }>
                                                            <div>
                                                                <span style={ { fontWeight: 'bold', fontSize: 14, lineHeight: '140%', color: '#0C152E' } }>Log out</span>
                                                            </div>
                                                            <div>
                                                                <span style={ { fontWeight: '500', fontSize: 14, lineHeight: '17px', color: '#888E9E' } }>Log out from ITSimple-Test</span>
                                                            </div>
                                                        </div>
                                                    </li></> }
                                    </ul>
                                </div>
                                <div className={ "col-auto active post_job" }>
                                    <div onClick={ (e) => goAddOffer(this, e) }>Post a job</div>
                                </div>
                                <div className="col-auto active">
                                    <div className={ "dropdown-toggle" } data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="flag-icon flag-icon-gb-eng" /> English
                                    </div>
                                    <ul className={ "dropdown-menu" }>
                                        <li className={ "dropdown-item" }><i
                                            className="flag-icon flag-icon-gb-eng" /> English
                                        </li>
                                        <li className={ "dropdown-item" }><i className="flag-icon flag-icon-pl" /> Polski
                                        </li>
                                        <li className={ "dropdown-item" }><i className="flag-icon flag-icon-ro" /> Românesc
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
