import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Content from '../../common/Content';

import ProfileForm from '../forms/ProfileForm';
import ExperienceList from '../lists/ExperienceList';
import ProjectList from '../lists/ProjectList';
import SkillList from '../lists/SkillList';
import './css/Profile.css';

class Profile extends Component {
    render() {
        const { currentUser } = this.props
        return(
            <div className='mt-5' id='profile'>
                <h4 className='mb-3'>{Content.profile.intro} <span className='name'>{currentUser.user.first_name}</span>!</h4>
                <ProfileForm {...this.props} />
                <div className='hr' />
                <div className='section'>
                    <h5>{Content.profile.experiences.title}</h5>
                    <Link to={`/users/${currentUser.user.id}/experiences/new`}>{Content.profile.experiences.buttonText}</Link>
                    <ExperienceList />
                </div>
                <div className='hr' />
                <div className='section'>
                    <h5>{Content.profile.projects.title}</h5>
                    <Link to={`/users/${currentUser.user.id}/projects/new`}>{Content.profile.projects.buttonText}</Link>
                    <ProjectList />
                </div>
                <div className='hr' />
                <div className='section'>
                    <h5>{Content.profile.skills.title}</h5>
                    <Link to={`/users/${currentUser.user.id}/skills/new`}>{Content.profile.skills.buttonText}</Link>
                    <SkillList />
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Content: Content,
        alerts: state.alerts,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {})(Profile);
