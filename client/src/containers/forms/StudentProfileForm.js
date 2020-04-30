import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Content } from '../../common/Content';
import { Genders } from '../../common/Definitions';
import { SUCCESS } from '../../store/actionTypes';
import { getProfile, updateProfile } from '../../store/actions/profiles';
import { removeAlert } from '../../store/actions/alerts';

import ExperienceList from '../lists/ExperienceList';
import ProjectList from '../lists/ProjectList';
import SkillList from '../lists/SkillList';

import './css/StudentProfileForm.css';

class StudentProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            program: '',
            graduation_date: '',
            gender: '',
            country: '',
            state: '',
            city: '',
        }
    }

    componentDidMount(){
        this.props.getProfile(this.props.currentUser.user._id)
        .then(() => {
            this.setState((state, props) => ({
                school: props.profile.school || '',
                program: props.profile.program || '',
                graduation_date: formatDate(props.profile.graduation_date) || '',
                gender: props.profile.gender || '',
                country: props.profile.country || '',
                state: props.profile.state || '',
                city: props.profile.city || '',
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
        const {school, program, graduation_date, gender, country, state, city} = this.state;
        const {alerts, history, removeAlert, currentUser, Genders} = this.props;
        history.listen(() => {
            removeAlert();
        });
        return(
            <form onSubmit={this.handleSubmit} id='profileform'>
                <div className='form'>
                    {alerts.alert === SUCCESS && alerts.message && (
                        <div className='alert alert-success'>{alerts.message}</div>
                    )}
                    {/* Form */}
                    <label htmlFor='school'>School *:</label>
                    <input id='school' name='school' onChange={this.handleChange} value={school} type='text' required />
                    <label htmlFor='program'>Program *:</label>
                    <input id='program' name='program' onChange={this.handleChange} value={program} type='text' required />
                    <label htmlFor='graduation_date'>Approximate Graduation Date *:</label>
                    <input id='graduation_date' name='graduation_date' onChange={this.handleChange} value={graduation_date} type='date' required />
                    <label htmlFor='country'>Country*:</label>
                    <input id='country' name='country' onChange={this.handleChange} value={country} type='text' required />
                    <label htmlFor='state'>State:</label>
                    <input id='state' name='state' onChange={this.handleChange} value={state} type='text' required />
                    <label htmlFor='city'>City:</label>
                    <input id='city' name='city' onChange={this.handleChange} value={city} type='text' required />
                    <label htmlFor='gender'>Gender:</label>
                    <select id="gender" name='gender' onChange={this.handleChange} value={gender} required >
                        <option disabled value=''>--Please choose an option--</option>
                        {Object.keys(Genders).map((key, i) => (<option key={i} value={key}>{Genders[key]}</option>))}
                    </select>
                </div>

                {/* Lists */}
                <div className='hr' />
                <div className='section'>
                    <h5>{Content.profile.experiences.title}</h5>
                    <Link to={`/users/${currentUser.user._id}/experiences/new`}>{Content.profile.experiences.buttonText}</Link>
                    <ExperienceList />
                </div>
                <div className='hr' />
                <div className='section'>
                    <h5>{Content.profile.projects.title}</h5>
                    <Link to={`/users/${currentUser.user._id}/projects/new`}>{Content.profile.projects.buttonText}</Link>
                    <ProjectList />
                </div>
                <div className='hr' />
                <div className='section'>
                    <h5>{Content.profile.skills.title}</h5>
                    <Link to={`/users/${currentUser.user._id}/skills/new`}>{Content.profile.skills.buttonText}</Link>
                    <SkillList />
                </div>

                {/* Save Button */}
                <button className='lumaki-btn' type='submit'>Save</button>
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
    return {
        Content: Content,
        Genders: Genders,
        alerts: state.alerts,
        profile: state.profile,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, { getProfile, updateProfile, removeAlert })(StudentProfileForm);
