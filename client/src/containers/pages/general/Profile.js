import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../../common/Content';
import { Profiles } from '../../../common/Definitions';

import StudentProfile from '../../pages/student/StudentProfile';
import EmployerProfile from '../../pages/employer/EmployerProfile';
import './css/Profile.css';

class Profile extends Component {
    render() {
        const { currentUser } = this.props;
        let profile = '';
        switch(currentUser.user.profile_type) {
            case Profiles.student: {
                return (
                    <div id='profile'>
                        <StudentProfile {...this.props} />
                    </div>
                );
            }
            case Profiles.employer: {
                return (
                    <div id='profile'>
                        <EmployerProfile {...this.props} />
                    </div>
                );
            }
            default: {
                return (<div id='profile' />);
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        profile: state.profile
    }
}

export default connect(mapStateToProps, {})(Profile);
