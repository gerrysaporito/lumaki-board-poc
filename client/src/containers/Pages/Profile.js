import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileForm from '../forms/ProfileForm';
import './css/Profile.css';

class Profile extends Component {
    render() {
        const { currentUser } = this.props
        return(
            <div className='mt-5' id='profile'>
                <h4 className='mb-3'>Welcome <span className='name'>{currentUser.user.first_name}</span>!</h4>
                <ProfileForm {...this.props} />
                <div className='hr' />
                <div className='section'>
                    <h5>Your Experiences</h5>
                    <Link to={`/users/${currentUser.user.id}/experiences/new`}>+ Add Experience</Link>
                </div>
                <div className='hr' />
                <div className='section'>
                    <h5>Your Projects</h5>
                    <Link to={`/users/${currentUser.user.id}/projects/new`}>+ Add Project</Link>
                </div>
                <div className='hr' />
                <div className='section'>
                    <h5>Your Skills</h5>
                    <Link to={`/users/${currentUser.user.id}/skills/new`}>+ Add Skill</Link>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null)(Profile);
