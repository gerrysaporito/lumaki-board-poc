import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import { Genders } from '../../common/Definitions';
import { getProfile, updateProfile } from '../../store/actions/profiles';

import './css/ProfileForm.css';

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
        const {currentUser} = this.props;
        return(
            <form onSubmit={this.handleSubmit} id='profileform'>
                {/* Form */}
                <div className='form'>
                    <label htmlFor='school'>School *:</label>
                    <input id='school' name='school' onChange={this.handleChange} value={school || ''} type='text' required />
                    <label htmlFor='program'>Program *:</label>
                    <input id='program' name='program' onChange={this.handleChange} value={program || ''} type='text' required />
                    <label htmlFor='graduation_date'>Approximate Graduation Date *:</label>
                    <input id='graduation_date' name='graduation_date' onChange={this.handleChange} value={graduation_date || ''} type='date' required />
                    <label htmlFor='country'>Country*:</label>
                    <input id='country' name='country' onChange={this.handleChange} value={country || ''} type='text' required />
                    <label htmlFor='state'>State:</label>
                    <input id='state' name='state' onChange={this.handleChange} value={state || ''} type='text' required />
                    <label htmlFor='city'>City:</label>
                    <input id='city' name='city' onChange={this.handleChange} value={city || ''} type='text' required />
                    <label htmlFor='gender'>Gender:</label>
                    <select id='gender' name='gender' onChange={this.handleChange} value={gender || ''} required >
                        <option disabled value=''>--Please choose an option--</option>
                        {Object.keys(Genders).map((key, i) => (<option key={i} value={key}>{Genders[key] || ''}</option>))}
                    </select>

                    {/* Save Button */}
                    <button className='lumaki-btn' type='submit'>Save</button>
                </div>
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
        alerts: state.alerts,
        profile: state.profile,
        experiences: state.experiences,
        projects: state.projects,
        skills: state.skills,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, { getProfile, updateProfile })(StudentProfileForm);
