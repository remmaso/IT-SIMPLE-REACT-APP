import React from 'react'
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


import registerBackground from '../assets/images/register.svg';
import { fireAuth } from '../utils/FirebaseConfig';

class RegisterEmployerPage extends React.Component {
    state = {
        email: '',
        password: '',
        passconf: ''
    }
    loginSuccess(user) {
        var profile = user.providerData[0];
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "users/recruiter", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authId: profile.uid,
                email: profile.email,
                name: profile.diplayName ? profile.diplayName : "Test Test"
            })
        }).then((res) => {
            console.log(res)
            if (res.status === 201)
                res.json().then(response => {
                    NotificationManager.info('Register Success!');
                });
            else if (res.status === 409) {
                NotificationManager.error('User already exist!');
            }
        })
    }

    loginFailure(error) {
        console.log('error', error);
    }

    emailSignup() {
        if (this.state.password !== this.state.passconf) { NotificationManager.error("Password mismatch!"); return; }
        fireAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => { this.loginSuccess(response.user) })
            .catch(error => { NotificationManager.error(error.message) })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div className={ "container auth-page" }>
                <div className={ "row" }>
                    <div className={ "col-6" } style={ { paddingLeft: 0 } }>
                        <div className={ "page-title" }>Join us</div>
                        <div className={ "page-sub-title" }>Give us some of your information to get free access</div>                        
                        <input className={ "email-input form-control" } placeholder={ "E-mail" } name="email"  onChange={this.handleChange} autoComplete="off"/>
                        <input className={ "password-input form-control" } placeholder={ "Password" } name="password" type="password" onChange={this.handleChange}/>
                        <input className={ "password-input form-control" } placeholder={ "Repeat password" } name="passconf" type="password" onChange={this.handleChange}/>
                        <button className={ "active signin-btn" } onClick={()=>{this.emailSignup();}}>Register</button>
                        <div style={ { textAlign: 'center', marginTop: 30, marginBottom: 20 } }>
                            <span style={ { color: '#888E9E', fontWeight: 600, fontSize: 12 } }>Do you have an account? <a href="/#/login_employer">Sign in</a></span>
                        </div>
                    </div>
                    <div className={ "col-6" }>
                        <img src={ registerBackground } alt="" className={ "auth-background" } />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterEmployerPage);