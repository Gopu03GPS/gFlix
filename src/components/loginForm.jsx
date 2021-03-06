import React from 'react';
import Joi from 'joi-browser';
import Form from "./common/form";
import auth, {login} from "../services/authService";
import {Redirect} from "react-router-dom";

class LoginForm extends Form {
    state = {
        data: {username: "", password: ""},
        errors: {},
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };

    onSubmission = async () => {
        try {
            const { data } = this.state;
            // after awaiting the promise response we have taken the responded json web token (jwt) from data and rename data as jwt
            await login(data.username, data.password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = this.state.errors;
                errors.password = error.response.data;
                this.setState({errors});
            }
        }
    }

    render() {
        if (auth.getCurrentUser()) return <Redirect to="/"/>;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;