import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Profiles } from '../../common/Definitions';
import { authUser } from '../../store/actions/auth';
import { removeAlert } from '../../store/actions/alerts';
import { Routes } from '../../common/Routes';

import './css/AuthForm.css';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
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
        const profileType = this.props.employers ? 'employer_profile' : 'student_profile';
        this.props.authUser(authType, {...this.state, profile_type: profileType})
        .then(user => {
            switch(user.profile_type) {
                case Profiles.student: {
                    let route = authType === 'register' ?
                        Routes.profile.url.replace(':user_id', user._id) : Routes.allPosts.url;
                    this.props.history.push(route);
                    break;
                }
                case Profiles.employer: {
                    let route = authType === 'register' ?
                        Routes.profile.url.replace(':user_id', user._id) : Routes.MyPostings.url.replace(':user_id', user._id);
                    this.props.history.push(route);
                    break;
                }
                default: {
                    break;
                }
            }
        })
        .catch(() => {
            return;
        });
    }

    render() {
        const {email, first_name, last_name, company} = this.state;
        const {buttonText, register, employers} = this.props;
        return(
            <form id='authform' onSubmit={this.handleSubmit}>
                {register && (
                    <div>
                        {employers && (
                            <React.Fragment>
                                <label htmlFor='company'>Company:</label>
                                <input id='company' name='company' onChange={this.handleChange} value={company || ''} type='text' required />
                            </React.Fragment>
                        )}
                        <label htmlFor='first_name'>First Name:</label>
                        <input id='first_name' name='first_name' onChange={this.handleChange} value={first_name || ''} type='text' required />
                        <label htmlFor='lastName'>Last Name:</label>
                        <input id='last_name' name='last_name' onChange={this.handleChange} value={last_name || ''} type='text' required />
                    </div>
                )}
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' onChange={this.handleChange} value={email || ''} type='text' required />
                <label htmlFor='password'>Password:</label>
                <input id='password' onChange={this.handleChange} name='password' type='password' required />
                <button className='lumaki-btn' type='submit'>{buttonText}</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { authUser, removeAlert })(AuthForm);
