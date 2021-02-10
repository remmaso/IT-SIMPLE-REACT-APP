import React from 'react'
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import loginBackground from '../assets/images/login.svg';
import { fireAuth } from '../utils/FirebaseConfig';
class LoginEmployerPage extends React.Component {

    loginSuccess(user) {
        var profile = user.providerData[0];

        fetch(process.env.REACT_APP_OFFERS_SERVICE_URL + "users?authId=" + profile.uid, {
            method: "GET"
        }).then((res) => {
            if (res.status === 200)
                res.json().then(response => {
                    if (response[0].classType === "recruiter") {
                        NotificationManager.info('Sign-in successful!');
                        localStorage.setItem('user', JSON.stringify(response[0]));
                        localStorage.setItem('role', 'recruiter');
                        this.props.history.push('/');
                    } else NotificationManager.error("This user is candidate user!")
                });
            else if (res.status === 404) {
                NotificationManager.error('User not fouund');
            }
        })
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
                        <input className={ "email-input form-control" } placeholder={ "E-mail" } name="email" onChange={ this.handleChange } autoComplete="off"/>
                        <input className={ "password-input form-control" } placeholder={ "Password" } name="password" type="password" onChange={ this.handleChange } />
                        <button className={ "active signin-btn" } onClick={ () => { this.emailSignin() } }>Sign in</button>
                        <div style={ { textAlign: 'center', marginTop: 30 } }>
                            <span style={ { color: '#888E9E', fontWeight: 600, fontSize: 12 } }>New account? <a href="/#/register_employer">Register</a></span>
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

export default withRouter(LoginEmployerPage);