import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS } from '../../store/actionTypes';
import { getProfile, updateProfile } from '../../store/actions/profiles';
import { removeAlert } from '../../store/actions/alerts';

import './css/ProfileForm.css';

class StudentProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            link: '',
            image:  '',
            company_description: '',
        }
    }

    componentDidMount(){
        this.props.getProfile(this.props.currentUser.user._id)
        .then(() => {
            this.setState((state, props) => ({
                company: props.profile.company || '',
                link: props.profile.link || '',
                image: props.profile.image || '',
                company_description: props.profile.company_description || '',
            }))
        })
        .catch(() => {});
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.updateProfile({...this.state})
        .then(() => {})
        .catch(() => {
            return;
        });
    }

    render() {
        const {company, link, image, company_description} = this.state;
        const {alerts, history, removeAlert} = this.props;
        history.listen(() => {
            removeAlert();
        });
        return(
            <form onSubmit={this.handleSubmit} id='profileform'>
                {/* Form */}
                <div className='form'>
                    {alerts.alert === SUCCESS && alerts.message && (
                        <div className='alert alert-success'>{alerts.message}</div>
                    )}
                    <label htmlFor='company'>Company *:</label>
                    <input id='company' name='company' onChange={this.handleChange} value={company} type='text' required />
                    <label htmlFor='link'>Company Link *:</label>
                    <input id='link' name='link' onChange={this.handleChange} value={link} type='text' required />
                    <label htmlFor='image'>Image Logo Link*:</label>
                    <input id='image' name='image' onChange={this.handleChange} value={image} type='text' required />
                    <label htmlFor='company_description'>Company Description:</label>
                    <textarea id='company_description' name='company_description' onChange={this.handleChange} value={company_description} required />
                </div>

                {/* Save Button */}
                <button className='lumaki-btn' type='submit'>Save</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        profile: state.profile,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, { getProfile, updateProfile, removeAlert })(StudentProfileForm);
