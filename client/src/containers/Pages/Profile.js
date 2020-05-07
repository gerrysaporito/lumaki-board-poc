import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import { Profiles } from '../../common/Definitions';
import { removeAlert } from '../../store/actions/alerts';

import StudentProfileForm from '../forms/StudentProfileForm';
import EmployerProfileForm from '../forms/EmployerProfileForm';
import './css/Profile.css';

class Profile extends Component {
    render() {
        const { currentUser, history } = this.props;
        history.listen(() => {
            removeAlert();
        });

        let profile = '';
        switch(currentUser.user.profile_type) {
            case Profiles.student: {
                profile =  (<StudentProfileForm {...this.props} />);
                break;
            }
            case Profiles.employer: {
                profile =  (<EmployerProfileForm {...this.props} />);
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
