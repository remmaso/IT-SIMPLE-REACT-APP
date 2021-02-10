import React, { Component } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';

import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./components/basic/ScrollToTop";

import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage';
import AboutUsPage from './screens/AboutUsPage';
import HomePage from './screens/HomePage';
import OfferDetailPage from './screens/OfferDetailPage';
import CompaniesPage from './screens/CompaniesPage';
import AddOfferPage from './screens/AddOfferPage';
import CompanyProflePage from './screens/CompanyProflePage';
import { NotificationContainer } from 'react-notifications';
import PersonalProfilePage from './screens/PersonalProfilePage';
import CompanyDashboardPage from './screens/CompanyDashboardPage';
import { CandidateRoute } from './components/basic/CandidateRoute';
import LoginEmployerPage from './screens/LoginEmployerPage';
import RegisterEmployerPage from './screens/RegisterEmployerPage';
import { RecruiterRoute } from './components/basic/RecruiterRoute';

if (process.env.NODE_ENV !== 'production') {
    localStorage.setItem('debug', 'it-simple:*');
}


class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <ScrollToTop>
                        <Header />
                        <div>
                            <Switch>
                                <Route path={ '/login' } component={ () => <LoginPage { ...this.props } /> } exact />
                                <Route path={ '/login_employer' } component={ () => <LoginEmployerPage { ...this.props } /> } exact />
                                <Route path={ '/register' } component={ () => <RegisterPage { ...this.props } /> } exact />
                                <Route path={ '/register_employer' } component={ () => <RegisterEmployerPage { ...this.props } /> } exact />
                                <Route path={ '/offer/add' } component={ AddOfferPage } exact />
                                <Route path={ '/offer/edit/:id' } component={ AddOfferPage } exact />
                                <Route path={ '/offer/:id' } component={ OfferDetailPage } exact />
                                <RecruiterRoute path={ '/company/profile' } component={ CompanyProflePage } exact />
                                <RecruiterRoute path={ '/company/dashboard/:id' } component={ CompanyDashboardPage } exact />
                                <CandidateRoute path={ '/user/profile' } component={ PersonalProfilePage } exact />
                                <Route path={ '/companies' } component={ CompaniesPage } exact />
                                <Route path={ '/aboutUs' } component={ AboutUsPage } exact />
                                <Route path={ '/' } component={ HomePage } exact />
                                <Redirect to={ "/" } />
                            </Switch>
                        </div>
                    </ScrollToTop>
                </Router>
                <Footer />
                <NotificationContainer />
            </div>
        );
    }
}



export default App;

