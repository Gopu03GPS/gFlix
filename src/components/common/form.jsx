import React, {Component} from 'react';
import Joi from 'joi-browser';
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, {abortEarly: false});

        //Using Joi
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) errors[item.path[0]] = item.message;
        return errors;
        //

        //Without using Joi
        // const errors = {};
        // const { data } = this.state;
        //
        // if (data.username.trim() === "")
        //     errors.username = "Username can't be empty."
        // if (data.password.trim() === "")
        //     errors.password = "Password can't be empty."
        //
        // return Object.keys(errors).length === 0 ? null : errors;
        //
    };

    validateProperty = ({ name, value }) => {
        //Using Joi
        const obj = { [name]: value};
        const schema = { [name]: this.schema[name]};
        const result = Joi.validate(obj, schema);
        return result.error ? result.error.details[0].message : null;
        //

        //Without using Joi
        // if (name === "username") {
        //     if (value.trim() === "") return "Username is required!";
        //     //other properties...
        // }
        // if (name === "password") {
        //     if (value.trim() === "") return "Password is required!";
        //     //other properties...
        // }
        //
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;

        //call the server
        this.onSubmission();
    };

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton = (label) => {
        return (
            <button disabled={this.validate()} className="btn btn-primary">
                {label}
            </button>
        );
    }

    renderInput = (name, label, type = "text") => {
        const { data, errors } = this.state;

        return (
            <Input
                name={name}
                label={label}
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderDropdown = (name, label, options) => {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                label={label}
                value={data[name]}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }
}

export default Form;