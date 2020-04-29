import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authUser } from '../../store/actions/auth';
import { removeAlert } from '../../store/actions/alerts';

import LOGO from '../../images/LumakiLabs_whitelogo.png';
import { ERROR } from '../../store/actionTypes';
import './css/AuthForm.css';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
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
            this.props.history.push(authType === 'register' ? `/users/${this.props.currentUser.user._id}`: '/jobs');
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
                            <input projectid='first_name' name='first_name' onChange={this.handleChange} value={first_name} type='text' required />
                            <label htmlFor='lastName'>Last Name:</label>
                            <input projectid='last_name' name='last_name' onChange={this.handleChange} value={last_name} type='text' required />
                        </div>
                    )}
                    <label htmlFor='email'>Email:</label>
                    <input projectid='email' name='email' onChange={this.handleChange} value={email} type='text' required />
                    <label htmlFor='password'>Password:</label>
                    <input projectid='password' onChange={this.handleChange} name='password' type='password' required />
                    <button className='btn lumaki-btn btn-md mt-3' type='submit'>{buttonText}</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, { authUser, removeAlert })(AuthForm);
