import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Content } from '../../../common/Content';
import StudentProfileForm from '../../forms/StudentProfileForm';
import ExperienceList from '../../../components/lists/ExperienceList';
import ProjectList from '../../../components/lists/ProjectList';
import SkillList from '../../../components/lists/SkillList';

class StudentProfile extends Component {
    render() {
        const {currentUser, experiences, projects, skills} = this.props;
        return(
            <React.Fragment>
                <p className='mb-3 header'>
                    {Content.profile.intro.student.register.header} <span className='name'>{currentUser.user.first_name}</span>!
                </p>
                <StudentProfileForm {...this.props} />

                {/* Lists */}
                <div className='hr' />
                <div className='profile-section'>
                    <p className='subheader'>{Content.profile.student.experiences.title}</p>
                    <Link className='add-btn' to={`/users/${currentUser.user._id}/experiences/new`}>{Content.profile.student.experiences.buttonText}</Link>
                    <ExperienceList currentUser={currentUser} experiences={experiences} />
                </div>
                <div className='hr' />
                <div className='profile-section'>
                    <p className='subheader'>{Content.profile.student.projects.title}</p>
                    <Link className='add-btn' to={`/users/${currentUser.user._id}/projects/new`}>{Content.profile.student.projects.buttonText}</Link>
                    <ProjectList currentUser={currentUser} projects={projects} />
                </div>
                <div className='hr' />
                <div className='profile-section'>
                    <p className='subheader'>{Content.profile.student.skills.title}</p>
                    <Link className='add-btn' to={`/users/${currentUser.user._id}/skills/new`}>{Content.profile.student.skills.buttonText}</Link>
                    <SkillList currentUser={currentUser} skills={skills} />
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state,
    }
}

export default connect(mapStateToProps, {})(StudentProfile);
