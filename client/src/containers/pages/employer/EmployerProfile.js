import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../../common/Content';
import EmployerProfileForm from '../../forms/EmployerProfileForm';

class EmployerProfile extends Component {
    render() {
        const {profile, currentUser} = this.props;
        let text = Content.profile.intro.employer.register.header.split(" ");
        text[text.indexOf(':name')] = currentUser.user.first_name;
        text[text.indexOf(':company!')] = profile.company;
        console.log(text)
        return(
            <React.Fragment>
                <p className='mb-3 header'>
                    {text.join(" ")}!
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
