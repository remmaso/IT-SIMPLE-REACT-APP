import React, { Component } from "react";
import BackButton from "../components/basic/BackButton";
import { withRouter } from "react-router-dom";
import Logger from "../utils/Logger";

class CompaniesPage extends Component {

    state = {
        companies: []
    }

    componentDidMount() {
        this.fetchCompanies();
    }

    fetchCompanies() {
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "companies")
            .then(res => {
                return res.json();
            })
            .then((data) => {
                console.log(data)
                this.setState({
                    companies: this.state.companies.concat(data)
                })
            })
            .catch((e) => Logger.warn(e, this));
    }
    render() {
        return (
            <div className={ "container companies-page" }>
                <BackButton />
                <h1>Companies</h1>
                {
                    this.state.companies.map((company, index) => (
                        <div key={ index } className={ "company-item row" }>
                            <div className="logo-div">
                                <img className={ "logo" } src={ company.companyImage ? company.companyImage : "placeholder_office.webp" } alt={ "Company logo" } />
                            </div>
                            <div className={ "col-auto item-left" } >
                                <div className={ "title" }>{ company.companyName }</div>
                            </div>
                            <div style={ { display: 'flex', marginLeft: 'auto', marginRight: 20 } }>
                                <div className={ "active navigation" } style={ { marginRight: 10, background: "#054AFA", color: 'white' } } onClick={ () => { this.props.history.push("/company/dashboard/" + company.id) } }>Go to dashboard</div>
                                <div className={ "active navigation" } style={ { background: "#054AFA", color: 'white' } } onClick={ () => { this.props.history.push("/company/profile/" + company.id) } }>Go to profile</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default withRouter(CompaniesPage);
