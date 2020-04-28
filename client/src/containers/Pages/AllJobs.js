import React, { Component } from 'react';
import { connect } from 'react-redux';

import JobsFilter from '../forms/JobsFilter';
import JobList from '../lists/JobList';

import './css/AllJobs.css';

class AllJobs extends Component {
    render() {
        return(
            <div className='mt-5' id='all-jobs'>
                <JobsFilter />
                <div className='section'>
                    <JobList />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(AllJobs);
