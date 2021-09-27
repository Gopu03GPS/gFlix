import React from 'react';

const Input = ({name, label, error, ...rest /*, type, value, onChange */}) => {             //we can use rest operator to avoid repetitively addition of props
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                {...rest}

                /*
                We are using rest along with spread operator (...) operator so the following and
                other props can include automatically, without writing each of them.

                type={type}
                value={value}
                onChange={onChange}
                */

                name={name}
                id={name}
                className="form-control"
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
