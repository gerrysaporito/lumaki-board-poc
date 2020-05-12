import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../../common/Content';
import EmployerProfileForm from '../../forms/EmployerProfileForm';

class EmployerProfile extends Component {
    render() {
        const {profile} = this.props;
        return(
            <React.Fragment>
                <p className='mb-3 header'>
                    {Content.profile.intro.employer.register.header} <span className='name'>{profile.company}</span>!
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
