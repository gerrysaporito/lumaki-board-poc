import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import { Profiles } from '../../common/Definitions';

import StudentProfileForm from '../forms/StudentProfileForm';
import './css/Profile.css';

class Profile extends Component {
    render() {
        const { currentUser, Profiles, Content } = this.props;
        let profile = '';
        switch(currentUser.user.profile_type) {
            case Profiles.student: {
                profile =  (<StudentProfileForm {...this.props} />);
                break;
            }
            case Profiles.employer: {
                profile = null;
                break;
            }
            default: {
                profile = null;
                break;
            }
        }
        return(
            <div className='mt-5' id='profile'>
                <h4 className='mb-3'>
                    {Content.profile.intro} <span className='name'>{currentUser.user.first_name}</span>!
                </h4>
                {profile}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        Profiles: Profiles,
        Content: Content,
    }
}

export default connect(mapStateToProps, {})(Profile);
