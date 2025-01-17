import React, { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router"
import {
    infoNotification,
    successfulNotification,
    errorNotification
} from '../store/actions/NotificationActions'
import { loginAccount } from '../store/actions/AccountActions'
import '../styles/LoginAccount.css'

class LoginAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",

            // fields validation
            emailValidation: "",
            passwordValidation: "",
        }
    }

    emailValidation(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    formValidation() {
        let isFormValid = true;

        let isMailValid = this.emailValidation(this.state.email)
        if (! isMailValid) {
            this.setState({ emailValidation: "Email is not in a valid format!" })
            isFormValid = false
        } else {
            this.setState({ emailValidation: "" })
        }

        if (this.state.password.length < 3) {
            this.setState({ passwordValidation: "Password must be more than 3 charaters long!"})
            isFormValid = false
        } else {
            this.setState({ passwordValidation: ""})
        }

        return isFormValid
    }

    handleSubmit() {
        let isFormValid = this.formValidation()
        if (! isFormValid) {
            return;
        }

        let userData = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginAccount(userData)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    let credentials = response.data
                    localStorage.setItem('token', credentials.token)
                    localStorage.setItem('userId', credentials.userId)
                    localStorage.setItem('userName', credentials.name)

                    this.props.successfulNotification("Loged in!")
                    this.props.history.push("/")
                } else {
                    this.props.errorNotification("Wrong credentials or this user doesn't exist!")
                }
            })
        }

    render() {
        return (
            <div className="loginFormContainer">
                <div>
                    <img className="pageLogo" src={require("../content/logo/page-logo.png")} alt="logo"/>
                </div>
                <div>
                    <div className="errorMessage">{this.state.emailValidation}</div>
                    <input
                        type="text"
                        placeholder="Email..."
                        name="email"
                        className="registrationField"
                        onChange={event => this.setState({ email: event.target.value })}
                    />
                </div>
                <div>
                    <div className="errorMessage">{this.state.passwordValidation}</div>
                    <input
                        type="password"
                        placeholder="Password..."
                        name="password"
                        className="registrationField"
                        onChange={event => this.setState({ password: event.target.value })}
                    />
                </div>
                <div>
                <div>
                    <a href="/account/registration">Register</a>
                </div>
                <button
                    type="button"
                    className="saveBtn"
                    onClick={this.handleSubmit.bind(this)}>&nbsp;Log in&nbsp;</button>
                <Route
                    render={({ history }) => (
                    <button
                        type="button"
                        className="backBtn"
                        onClick={() => { this.props.history.goBack() }}>Go Back</button>
                    )}
                />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginAccount: (userData) => dispatch(loginAccount(userData)),

         // Notifications
        infoNotification: (message) => dispatch(infoNotification(message)),
        successfulNotification: (message) => dispatch(successfulNotification(message)),
        errorNotification: (message) => dispatch(errorNotification(message))
    }
}

export default connect(null, mapDispatchToProps)(LoginAccount)