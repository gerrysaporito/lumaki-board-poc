import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IndustryValues, JobDurations } from '../../common/Definitions';
import { fetchJobs } from '../../store/actions/jobs';

import './css/JobsFilter.css';

class JobsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            industry: '',
            duration: '',
        }
    }

    componentDidMount(){
        this.props.fetchJobs({})
        .then(() => this.setState({
            company: '',
            industry: '',
            duration: '',
        }))
        .catch(() => {});
    }

    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }, function() {
                let filterObj = {};
                let filterKeys = Object.keys(this.state)
                    .filter(key => this.state[key] !== '')
                    .forEach(key => filterObj[key] = this.state[key]);
                this.props.fetchJobs(filterObj)
                    .then(() => {})
                    .catch(() => {})
                return;
            }
        );
    }

    render() {
        const {company, industry, duration} = this.state;
        return(
            <div id='jobs-filter'>
                <div className='filter'>
                    <label htmlFor='company'>Company:</label>
                    <input id='company' name='company' onChange={this.handleChange} value={company} type='text' />
                </div>

                <div className='filter'>
                    <label htmlFor='industry'>Industry:</label>
                    <select id="industry" name='industry' onChange={this.handleChange} value={industry} >
                        <option value=''>Any</option>
                        {Object.values(this.props.IndustryValues).map((industry, i) => (
                            <option key={i} value={industry}>{industry}</option>
                        ))}
                    </select>
                </div>

                <div className='filter'>
                    <label htmlFor='duration'>Duration:</label>
                    <select id="duration" name='duration' onChange={this.handleChange} value={duration} >
                        <option value=''>Any</option>
                        {Object.values(this.props.JobDurations).map((duration, i) => (
                            <option key={i} value={duration}>{duration}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        IndustryValues: IndustryValues,
        JobDurations: JobDurations,
    }
}

export default connect(mapStateToProps, { fetchJobs })(JobsFilter);
