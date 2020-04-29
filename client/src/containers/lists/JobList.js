import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeJob } from '../../store/actions/jobs';

import JobListItem from '../../components/items/JobListItem';
import './css/JobList.css';

class JobList extends Component {
    render() {
        const {jobs, removeJob, currentUser} = this.props;
        let jobList = jobs.map(m => (
            <JobListItem
                key={m._id}
                {...m}
                removeJob={removeJob.bind(this, m.user, m._id)}
                isCorrectUser={currentUser.user._id === m.user}
                currentUser={currentUser}
            />
        ));
        return(
            <div className='job-list'>
                {jobList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        jobs: state.jobs,
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, { removeJob })(JobList);
