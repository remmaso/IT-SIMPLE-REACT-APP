import React from 'react'
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


import google_icon from '../assets/images/google-icon.png'
import facebook_icon from '../assets/images/facebook-icon.png'
import linkedin_icon from '../assets/images/linkedin-icon.png'
import github_icon from '../assets/images/github-icon.svg'
import loginBackground from '../assets/images/login.svg';
import { fireAuth, googleProvider } from '../utils/FirebaseConfig';

class LoginPage extends React.Component {

    state = {
        email: '',
        password: ''
    }

    loginSuccess(user) {
        var profile = user.providerData[0];

        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "users?authId=" + profile.uid, {
            method: "GET"
        }).then((res) => {
            if (res.status === 200)
                res.json().then(response => {
                    if (response[0].classType === "userProfile") {
                        NotificationManager.info('Sign-in successful!');
                        localStorage.setItem('user', JSON.stringify(response[0]));
                        localStorage.setItem('role', 'candidate');
                        this.props.history.push('/');
                    }
                    else NotificationManager.error('This user is recruiter!');
                });
            else if (res.status === 404) {
                NotificationManager.error('User not fouund');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    loginFailure(error) {
        console.log('error', error);
    }

    googleSignin() {
        fireAuth.signInWithPopup(googleProvider)
            .then(response => { this.loginSuccess(response.user); })
            .catch(error => { NotificationManager.error(error.message) })
    }

    emailSignin() {
        fireAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
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
                        <div className={ "page-title" }>Sign in</div>
                        <div className={ "page-sub-title" }>Give us some of your information to get free access</div>
                        <div className={ "row" }>
                            <div className={ "col-6" } style={ { paddingRight: 5 } }>
                                <div className={ "active login-btn" } onClick={ () => { this.googleSignin() } }>
                                    <img src={ google_icon } alt="" className={ "login-btn-icon" } />Sign in with Google
                                </div>
                            </div>
                            <div className={ "col-6" } style={ { paddingLeft: 5 } }>
                                <div className={ "active login-btn" } onClick={ () => { this.props.signOut() } }>
                                    <img src={ facebook_icon } alt="" className={ "login-btn-icon" } />Sign in with Facebook
                                </div>
                            </div>
                            <div className={ "col-6" } style={ { paddingRight: 5 } }>
                                <div className={ "active login-btn" }>
                                    <img src={ linkedin_icon } alt="" className={ "login-btn-icon" } />Sign in with Linkedin
                                </div>
                            </div>
                            <div className={ "col-6" } style={ { paddingLeft: 5 } }>
                                <div className={ "active login-btn" }>
                                    <img src={ github_icon } alt="" className={ "login-btn-icon" } />Sign in with Github
                                </div>
                            </div>
                        </div>
                        <hr className={ "or-line" } />
                        <div className={ "or-txt" }><span>or</span></div>
                        <input className={ "email-input form-control" } placeholder={ "E-mail" } name="email" onChange={ this.handleChange } autoComplete="off"/>
                        <input className={ "password-input form-control" } placeholder={ "Password" } type={ "password" } name="password" onChange={ this.handleChange } />
                        <button className={ "active signin-btn" } onClick={ () => { this.emailSignin() } }>Sign in</button>
                        <div style={ { textAlign: 'center', marginTop: 30 } }>
                            <span style={ { color: '#888E9E', fontWeight: 600, fontSize: 12 } }>New account? <a href="/#/register">Register</a></span>
                        </div>
                        <div style={ { textAlign: 'center', marginTop: 20, marginBottom: 20 } }>
                            <span style={ { color: '#888E9E', fontWeight: 600, fontSize: 12 } }><a href="/#/forgot-password">Forgot password?</a></span>
                        </div>
                    </div>
                    <div className={ "col-6" }>
                        <img src={ loginBackground } alt="" className={ "auth-background" } />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPage);