import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';

import ProfileForm from '../forms/ProfileForm';
import './css/Profile.css';

class Profile extends Component {
    render() {
        const { currentUser } = this.props
        return(
            <div className='mt-5' id='profile'>
                <h4 className='mb-3'>
                    {Content.profile.intro} <span className='name'>{currentUser.user.first_name}</span>!
                </h4>
                <ProfileForm {...this.props} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Content: Content,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {})(Profile);
