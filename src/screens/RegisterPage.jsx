import React from 'react'
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


import google_icon from '../assets/images/google-icon.png'
import facebook_icon from '../assets/images/facebook-icon.png'
import linkedin_icon from '../assets/images/linkedin-icon.png'
import github_icon from '../assets/images/github-icon.svg'
import registerBackground from '../assets/images/register.svg';
import { fireAuth, googleProvider } from '../utils/FirebaseConfig';

class RegisterPage extends React.Component {

    state = {
        email: '',
        password: '',
        passconf: ''
    }
    loginSuccess(user) {
        var profile = user.providerData[0];
        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "users/profile", {
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

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    googleSignin() {
        fireAuth.signInWithPopup(googleProvider)
            .then(response => { this.loginSuccess(response.user); })
            .catch(error => { NotificationManager.error(error.message) })
    }

    emailSignup() {
        if (this.state.password !== this.state.passconf) { NotificationManager.error("Password mismatch!"); return; }
        fireAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => { this.loginSuccess(response.user) })
            .catch(error => { NotificationManager.error(error.message) })
    }
    render() {
        return (
            <div className={ "container auth-page" }>
                <div className={ "row" }>
                    <div className={ "col-6" } style={ { paddingLeft: 0 } }>
                        <div className={ "page-title" }>Join us</div>
                        <div className={ "page-sub-title" }>Give us some of your information to get free access</div>
                        <div className={ "row" }>
                            <div className={ "col-6" } style={ { paddingRight: 5 } }>
                                <div className={ "active login-btn" } onClick={ () => { this.googleSignin() } }>
                                    <img src={ google_icon } alt="" className={ "login-btn-icon" } />Register with Google
                                </div>
                            </div>
                            <div className={ "col-6" } style={ { paddingLeft: 5 } }>
                                <div className={ "active login-btn" }>
                                    <img src={ facebook_icon } alt="" className={ "login-btn-icon" } />Register with Facebook
                                </div>
                            </div>
                            <div className={ "col-6" } style={ { paddingRight: 5 } }>
                                <div className={ "active login-btn" }>
                                    <img src={ linkedin_icon } alt="" className={ "login-btn-icon" } />Register with Linkedin
                                </div>
                            </div>
                            <div className={ "col-6" } style={ { paddingLeft: 5 } }>
                                <div className={ "active login-btn" }>
                                    <img src={ github_icon } alt="" className={ "login-btn-icon" } />Register with Github
                                </div>
                            </div>
                        </div>
                        <hr className={ "or-line" } />
                        <div className={ "or-txt" }><span>or</span></div>
                        <input className={ "email-input form-control" } placeholder={ "E-mail" } onChange={ this.handleChange } name="email" autoComplete="off"/>
                        <input className={ "password-input form-control" } placeholder={ "Password" } onChange={ this.handleChange } name="password" type="password" />
                        <input className={ "password-input form-control" } placeholder={ "Repeat password" } onChange={ this.handleChange } name="passconf" type="password" />
                        <button className={ "active signin-btn" } onClick={ () => { this.emailSignup() } }>Register</button>
                        <div style={ { textAlign: 'center', marginTop: 30, marginBottom: 20 } }>
                            <span style={ { color: '#888E9E', fontWeight: 600, fontSize: 12 } }>Do you have an account? <a href="/#/login">Sign in</a></span>
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

export default withRouter(RegisterPage);