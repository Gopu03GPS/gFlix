import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
    state = {
        data: {username: "", password: "", name: ""},
        errors: {}
    }

    schema = {
        username: Joi.string().required().label("Username").email(),
        password: Joi.string().required().label("Password").min(5),
        name: Joi.string().required().label("Name"),
    }

    onSubmission = async () => {
        try {
            const response = await userService.register(this.state.data);
            //after registering we are now logging in the user, extracting x-auth-token (jwt-token) from headers of response object after registering.
            auth.loginWithJwt(response.headers["x-auth-token"]);
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = error.response.data;
                this.setState({errors});
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;