import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApplicantListItem from '../../components/items/ApplicantListItem';
import './css/ApplicantList.css';

class ApplicantList extends Component {
    render() {
        const {applicants, currentUser} = this.props;
        let ApplicantList = applicants.map(m => (
            <ApplicantListItem
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
    return {
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, {})(ApplicantList);
