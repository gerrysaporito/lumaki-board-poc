import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import { IndustryColorValues } from '../../common/Definitions';
import { getJob } from '../../store/actions/jobs';

import './css/Job.css';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            link: '',
            image: '',
            position: '',
            industry: '',
            location: '',
            start_date: '',
            end_date: '',
            company_description: '',
            position_description: '',
            responsibilities: [],
            requirements: [],
            compensation: [],
        };
    };

    componentDidMount() {
        const job_id = this.props.match.params.job_id;
        this.props.getJob(job_id, {_id: job_id})
        .then(job => this.setState({
            ...job,
            start_date: formatDate(job.start_date),
            end_date: formatDate(job.end_date),
        }))
        .catch(() => {});
    }
    render() {
        return(
            <div id='job-container'>
                <div className='job'>
                    <div className='tile'>
                        <div className='industry-color-bar' style={{backgroundColor: IndustryColorValues[this.state.industry]}} />
                        <div className='content'>
                            <img src={this.state.image} alt={`${this.state.company} Logo`} />
                            <p className='position'>{this.state.position}</p>
                            <p className='company'>{this.state.company}</p>
                            <p className='location'>{this.state.location}</p>
                            <p className='duration'><strong>Duration:</strong> {datediff(this.state.start_date, this.state.end_date)} weeks</p>
                            <div className='description'>
                                <p className='title'><strong>Company Description:</strong></p>
                                <p>{this.state.company_description}</p>
                            </div>
                        </div>
                    </div>

                    <div className='tile'>
                        <div className='content'>
                            <h3>{`${Content.job.title.description} ${this.state.company}`}</h3>
                            <p>{this.state.position_description}</p>
                            <div className='description'>
                                <p className='title'><strong>Responsibilities:</strong></p>
                                <ul>
                                    {this.state.responsibilities.map((resp, i) => (<li key={i}>{resp.text}</li>))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='tile'>
                        <div className='content'>
                            <h3>{`${Content.job.title.requirements}`}</h3>
                            <ul>
                                {this.state.requirements.map((req, i) => (<li key={i}>{req.text}</li>))}
                            </ul>
                        </div>
                    </div>

                    <div className='tile'>
                        <div className='content'>
                            <h3>{`${Content.job.title.compensation}`}</h3>
                            <ul>
                                {this.state.compensation.map((req, i) => (<li key={i}>{req.text}</li>))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function datediff(start_date, end_date) {
    let first = new Date(start_date);
    let second = new Date(end_date)
    return Math.round((second-first)/(1000*60*60*24*7));
}


function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        currentUser: state.currentUser,
        Content: Content,
    }
}

export default connect(mapStateToProps, { getJob })(Job);
