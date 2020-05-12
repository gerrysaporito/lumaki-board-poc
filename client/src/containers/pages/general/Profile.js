import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../../common/Content';
import { Profiles } from '../../../common/Definitions';

import StudentProfileForm from '../../forms/StudentProfileForm';
import EmployerProfile from '../../pages/employer/EmployerProfile';
import './css/Profile.css';

class Profile extends Component {
    render() {
        const { currentUser, history } = this.props;
        let profile = '';
        switch(currentUser.user.profile_type) {
            case Profiles.student: {
                profile =  (<StudentProfileForm {...this.props} />);
                break;
            }
            case Profiles.employer: {
                profile =  (<EmployerProfile {...this.props} />);
                break;
            }
            default: {
                profile = null;
                break;
            }
        }
        return(
            <div id='profile'>
                <p className='mb-3 header'>
                    {Content.profile.intro.student.register.header} <span className='name'>{currentUser.user.first_name}</span>!
                </p>
                {profile}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {})(Profile);
