import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authUser } from '../store/actions/auth';

import LOGO from '../images/LumakiLabs_whitelogo.png';
import './css/AuthForm.css';
import { ERROR } from '../store/actionTypes';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
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
        this.props.authUser(authType, this.state)
        .then(res => {
            this.props.history.push(authType === 'register' ? `/users/${this.props.currentUser.user.id}`: '/jobs');
        })
        .catch(() => {
            return;
        })
    }

    render() {
        const {email, first_name, last_name} = this.state;
        const {heading, buttonText, register, alerts, history, removeAlert} = this.props;
        history.listen(() => {
            removeAlert();
        });

        return(
            <div id='authform'>
                <img src={LOGO} alt='LumakiBoard Logo' />
                <h6 className='mb-5'>{heading}</h6>
                {alerts.alert === ERROR && alerts.message && (
                    <div className='error'>
                        <div className='alert alert-danger'>
                            {alerts.message.message}
                        </div>
                    </div>
                )}
                <form onSubmit={this.handleSubmit}>
                    {register && (
                        <div>
                            <label htmlFor='first_name'>First Name:</label>
                            <input className='form-control' id='first_name' name='first_name' onChange={this.handleChange} value={first_name} type='text' />
                            <label htmlFor='lastName'>Last Name:</label>
                            <input className='form-control' id='last_name' name='last_name' onChange={this.handleChange} value={last_name} type='text' />
                        </div>
                    )}
                    <label htmlFor='email'>Email:</label>
                    <input className='form-control' id='email' name='email' onChange={this.handleChange} value={email} type='text' />
                    <label htmlFor='password'>Password:</label>
                    <input className='form-control' id='password' onChange={this.handleChange} name='password' type='password' />
                    <button className='btn lumaki-btn btn-md mt-3' type='submit'>{buttonText}</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { authUser })(AuthForm);
