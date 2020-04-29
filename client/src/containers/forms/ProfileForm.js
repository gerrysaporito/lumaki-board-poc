import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS } from '../../store/actionTypes';
import { fetchUserProfile, updateUserProfile } from '../../store/actions/auth';
import { removeAlert } from '../../store/actions/alerts';

import './css/ProfileForm.css';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            program: '',
            graduation_year: '',
            gender: '',
            country: '',
            state: '',
            city: '',
        }
    }

    componentDidMount(){
        this.props.fetchUserProfile(this.props.currentUser.user._id)
        .then(() => this.setState({
            school: this.props.currentUser.user.school || '',
            program: this.props.currentUser.user.program || '',
            graduation_year: formatDate(this.props.currentUser.user.graduation_year) || '',
            gender: this.props.currentUser.user.gender || '',
            country: this.props.currentUser.user.country || '',
            state: this.props.currentUser.user.state || '',
            city: this.props.currentUser.user.city || '',
        }))
        .catch(() => {});
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.updateUserProfile({...this.state})
        .then(() => {})
        .catch(() => {
            return;
        });
    }

    render() {
        const {school, program, graduation_year, gender, country, state, city} = this.state;
        const {alerts, history, removeAlert} = this.props;
        history.listen(() => {
            removeAlert();
        });
        return(
            <form onSubmit={this.handleSubmit} id='profileform'>
                {alerts.alert === SUCCESS && alerts.message && (
                    <div className='alert alert-success'>{alerts.message}</div>
                )}
                <label htmlFor='school'>School *:</label>
                <input id='school' name='school' onChange={this.handleChange} value={school} type='text' required />
                <label htmlFor='program'>Program *:</label>
                <input id='program' name='program' onChange={this.handleChange} value={program} type='text' required />
                <label htmlFor='graduation_year'>Approximate Graduation Date *:</label>
                <input id='graduation_year' name='graduation_year' onChange={this.handleChange} value={graduation_year} type='date' required />
                <label htmlFor='country'>Country*:</label>
                <input id='country' name='country' onChange={this.handleChange} value={country} type='text' required />
                <label htmlFor='state'>State:</label>
                <input id='state' name='state' onChange={this.handleChange} value={state} type='text' required />
                <label htmlFor='city'>City:</label>
                <input id='city' name='city' onChange={this.handleChange} value={city} type='text' required />
                <label htmlFor='gender'>Gender:</label>
                <select id="gender" name='gender' onChange={this.handleChange} value={gender} required >
                    <option disabled value=''>--Please choose an option--</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="not_specified">Prefer not to specify</option>
                </select>
                <button className='btn lumaki-btn btn-md mt-3' type='submit'>Save</button>
            </form>
        )
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { fetchUserProfile, updateUserProfile, removeAlert })(ProfileForm);
