import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProfile, updateProfile } from '../../store/actions/profiles';
import { IndustryValues, CompaySize } from '../../common/Definitions';
import { Content } from '../../common/Content';

import './css/ProfileForm.css';

class EmployerProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            link: '',
            image:  '',
            company_size: '',
            remote_internship_experience: '',
            company_industry: '',
            company_description: '',
            country: '',
            state: '',
            city: '',
        }
    }

    componentDidMount(){
        this.props.getProfile(this.props.currentUser.user._id)
        .then(() => {
            this.setState((state, props) => ({
                company: props.profile.company || '',
                link: props.profile.link || '',
                image: props.profile.image || '',
                company_size: props.profile.company_size || '',
                remote_internship_experience: props.profile.remote_internship_experience || '',
                company_industry: props.profile.company_industry || '',
                company_description: props.profile.company_description || '',
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
        const {company, link, image, company_size, remote_internship_experience, company_industry, company_description, country,  state, city} = this.state;
        return(
            <form onSubmit={this.handleSubmit} id='profileform'>
                {/* Form */}
                <div className='form'>
                    <label htmlFor='company'>Company *:</label>
                    <input id='company' name='company' onChange={this.handleChange} value={company || ''} type='text' required />
                    <label htmlFor='link'>Company Link *:</label>
                    <input id='link' name='link' onChange={this.handleChange} value={link || ''} type='text' required />
                    <label htmlFor='image'>Image Logo Link *:</label>
                    <input id='image' name='image' onChange={this.handleChange} value={image || ''} type='text' required />
                    {/* Location & Industry */}
                    <div className='form-section mt-2'>
                        <div className='form-section-item'>
                            <label htmlFor='company_size'>Company Size *:</label>
                            <select id='company_size' name='company_size' onChange={this.handleChange} value={company_size || ''} required >
                                <option disabled value=''>--Please choose an option--</option>
                                {Object.values(CompaySize).map((company_size, i) => (<option key={i} value={company_size || ''}>{company_size}</option>))}
                            </select>
                        </div>
                        <div className='form-section-item'>
                            <label htmlFor='company_industry'>Industry *:</label>
                            <select id='company_industry' name='company_industry' onChange={this.handleChange} value={company_industry || ''} required >
                                <option disabled value=''>--Please choose an option--</option>
                                {Object.values(IndustryValues).map((company_industry, i) => (<option key={i} value={company_industry || ''}>{company_industry}</option>))}
                            </select>
                        </div>
                    </div>

                    <label htmlFor='country'>Country *:</label>
                    <input id='country' name='country' onChange={this.handleChange} value={country || ''} type='text' required />
                    <label htmlFor='state'>Province/State *:</label>
                    <input id='state' name='state' onChange={this.handleChange} value={state || ''} type='text' required />
                    <label htmlFor='city'>City:</label>
                    <input id='city' name='city' onChange={this.handleChange} value={city || ''} type='text' required />
                    <label htmlFor='remote_internship_experience'>Have you ever run a remote internship before? *</label>
                    <select id='remote_internship_experience' name='remote_internship_experience' onChange={this.handleChange} value={remote_internship_experience} required >
                        <option disabled value=''>--Please choose an option--</option>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                    </select>
                </div>
                <div className='hr' />
                <div className='form'>
                    <p className='subheader'>{Content.profile.employer.description.title}</p>
                    <label htmlFor='company_description'>{Content.profile.employer.description.subTitle}</label>
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

export default connect(mapStateToProps, { getProfile, updateProfile })(EmployerProfileForm);
