import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApplicantItem from '../../components/items/ApplicantItem';
import './css/ApplicantList.css';

class ApplicantList extends Component {
    render() {
        const {applicants, currentUser} = this.props;
        let ApplicantList = applicants.map(m => (
            <ApplicantItem
                key={m._id}
                user={m.user}
                profile={m.profile}
                currentUser={currentUser}
            />
        ));

        return(
            <div className='applicant-list'>
                {ApplicantList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {})(ApplicantList);
