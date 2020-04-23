import React, { Component } from 'react';

import LOGO from '../images/LumakiLabs_whitelogo.png';
import './css/AuthForm.css';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            profileImageUrl: '',
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.register ? 'register' : 'login';
        this.props.onAuth(authType, this.state)
        .then(() => {
            this.props.history.push(authType === 'register' ? '/profile': '/jobs');
        })
        .catch(() => {
            return;
        })
    }

    render() {
        const {email, firstName, lastName} = this.state;
        const {heading, buttonText, register, errors, history, removeError} = this.props;
        history.listen(() => {
            removeError();
        });

        return(
            <div>
                <div className='row justify-content-md-center text-center' id='authform'>
                    <img src={LOGO} alt='LumakiBoard Logo' />
                    <h6 className='mb-5'>{heading}</h6>
                    {errors.message && (
                        <div className='error'>
                            <div className='alert alert-danger container'>
                                {errors.message.message}
                            </div>
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        {register && (
                            <div>
                                <label htmlFor='firstName'>First Name:</label>
                                <input className='form-control' id='firstName' name='firstName' onChange={this.handleChange} value={firstName} type='text' />
                                <label htmlFor='lastName'>Last Name:</label>
                                <input className='form-control' id='lastName' name='lastName' onChange={this.handleChange} value={lastName} type='text' />
                            </div>
                        )}
                        <label htmlFor='email'>Email:</label>
                        <input className='form-control' id='email' name='email' onChange={this.handleChange} value={email} type='text' />
                        <label htmlFor='password'>Password:</label>
                        <input className='form-control' id='password' onChange={this.handleChange} name='password' type='password' />
                        <button className='btn btn-outline-light btn-md mt-3' type='submit'>{buttonText}</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AuthForm;