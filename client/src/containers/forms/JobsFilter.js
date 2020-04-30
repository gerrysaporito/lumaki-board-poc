import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IndustryValues } from '../../common/Definitions';
import { fetchJobs } from '../../store/actions/jobs';

import './css/JobsFilter.css';

class JobsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            industry: '',
            duration: '',
        }
    }

    componentDidMount(){
        this.props.fetchJobs({})
        .then(() => this.setState({
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
                Object.keys(this.state)
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
        const {industry, duration} = this.state;
        return(
            <div id='jobs-filter'>
                <div className='filter'>
                    <label htmlFor='industry'>Industry:</label>
                    <select id="industry" name='industry' onChange={this.handleChange} value={industry} >
                        <option value=''>Any</option>
                        {Object.values(IndustryValues).map((industry, i) => (
                            <option key={i} value={industry}>{industry}</option>
                        ))}
                    </select>
                </div>

                <div className='filter'>
                    <label htmlFor='duration'>Duration (weeks):</label>
                    <input id='duration' name='duration' onChange={this.handleChange} value={duration} type='number' />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { fetchJobs })(JobsFilter);
