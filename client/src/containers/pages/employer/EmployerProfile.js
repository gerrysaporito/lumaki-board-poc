import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../../common/Content';
import EmployerProfileForm from '../../forms/EmployerProfileForm';

class EmployerProfile extends Component {
    render() {
        const {currentUser} = this.props;
        return(
            <React.Fragment>
                <p className='mb-3 header'>
                    {Content.profile.intro.student.register.header} <span className='name'>{currentUser.user.first_name}</span>!
                </p>
                <EmployerProfileForm {...this.props} />
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(EmployerProfile);
