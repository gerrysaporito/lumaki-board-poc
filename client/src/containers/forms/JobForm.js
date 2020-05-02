import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewJob, getJob, updateJob } from '../../store/actions/jobs';
import { Content } from '../../common/Content';
import { IndustryValues } from '../../common/Definitions';
import './css/Form.css'

class JobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // company: '',
            // link: '',
            // image: '',
            position: '',
            job_industry: '',
            // location: '',
            start_date: '',
            end_date: '',
            // company_description: '',
            position_description: '',
            responsibilities: [''],
            requirements: [''],
            compensation: [''],
        };
    };

    componentDidMount() {
        if(this.props.location.pathname.split('/').pop() === 'edit') {
            const job_id = this.props.match.params.job_id;
            this.props.getJob(job_id)
            .then(job => this.setState({
                ...job,
                start_date: formatDate(job.start_date),
                end_date: formatDate(job.end_date),
            }))
            .catch(() => {});
        }
    }

    handleNewJob = e => {
        e.preventDefault();
        const job_id = this.props.match.params.job_id;
        if (this.props.location.pathname.split('/').pop() === 'edit') {
            this.props.updateJob({...this.state}, job_id);
        } else {
            this.props.postNewJob({...this.state});
        }
        this.setState({
            company: '',
            link: '',
            image: '',
            position: '',
            job_industry: '',
            location: '',
            start_date: '',
            end_date: '',
            company_description: '',
            position_description: '',
            responsibilities: [''],
            requirements: [''],
            compensation: [''],
        });
        this.props.history.push('/jobs');
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleArrayTextChange = i => e => {
        const newArray = this.state[e.target.name].map((responsibility, j) =>
        i !== j ? responsibility : { ...responsibility, text: e.target.value});

        this.setState({ [e.target.name]: newArray });
    };

    handleAddInput = e => {
        this.setState({
            [e.target.name]: this.state[e.target.name].concat([{ text: '' }])
        });
    };

    handleRemoveFromArray = i => e => {
        this.setState({
            [e.target.name]: this.state[e.target.name].filter((s, j) => i !== j)
        });
    };

    handleBackClick = e => {
        e.preventDefault();
        console.log(this.state)
        this.props.history.goBack();
    }

    render() {
        const buttonText = this.props.location.pathname.split('/').pop() === 'edit' ?
            Content.forms.job.buttonText.edit : Content.forms.job.buttonText.create;
        return(
            <div className='form'>
                <div>
                    <form onSubmit={this.handleNewJob} >
                        <p>{Content.forms.job.note}</p>
                        <h3>{Content.forms.job.title}</h3>

                        {/* Error Message */}
                        {this.props.alerts === ERROR && this.props.alerts.message && (
                            <div className='alert alert-danger'>
                                {this.props.alerts.message}
                            </div>
                        )}

                        {/* Company Name */}
                        {/* <label htmlFor='company'>Company/Organization:</label>
                        <input id='company' name='company' onChange={this.handleChange} value={this.state.company} type='text' required /> */}
                        {/* Link and Imaage */}
                        {/* <div className='form-section mt-2'>
                            <div className='form-section-item'>
                                <label htmlFor='link'>Website Link:</label>
                                <input id='link' name='link' onChange={this.handleChange} value={this.state.link} type='text' required />
                            </div>
                            <div className='form-section-item'>
                                <label htmlFor='image'>Image URL:</label>
                                <input id='image' name='image' onChange={this.handleChange} value={this.state.image} type='text' required />
                            </div>
                        </div> */}
                        {/* Company Description */}
                        {/* <label htmlFor='company_description'>Company Description:</label>
                        <textarea id='company_description' name='company_description' onChange={this.handleChange} value={this.state.company_description} type='text' required /> */}

                        {/* Position Title */}
                        <label htmlFor='position'>Position:</label>
                        <input id='position' name='position' onChange={this.handleChange} value={this.state.position} type='text' required />

                        {/* Location & Industry */}
                        <div className='form-section mt-2'>
                            <div className='form-section-item'>
                                <label htmlFor='location'>Location:</label>
                                <input id='location' name='location' onChange={this.handleChange} value={this.state.location} type='text' required />
                            </div>
                            <div className='form-section-item'>
                                <label htmlFor='job_industry'>Job Industry:</label>
                                <select id='job_industry' name='job_industry' onChange={this.handleChange} value={this.state.job_industry} required >
                                    <option disabled value=''>--Please choose an option--</option>
                                    {Object.values(IndustryValues).map((job_industry, i) => (<option key={i} value={job_industry}>{job_industry}</option>))}
                                </select>
                            </div>
                        </div>

                        {/* Dates of Employment */}
                        <div className='form-section mt-2'>
                            <div className='form-section-item'>
                                <label htmlFor='start_date'>Start Date:</label>
                                <input id='start_date' name='start_date' onChange={this.handleChange} value={this.state.start_date} type='date' required />
                            </div>
                            <div className='form-section-item'>
                                <label htmlFor='end_date'>End Date:</label>
                                <input id='end_date' name='end_date' onChange={this.handleChange} value={this.state.end_date} type='date' required />
                            </div>
                        </div>

                        {/* Position Description */}
                        <label htmlFor='position_description'>Position Description:</label>
                        <textarea id='position_description' name='position_description' onChange={this.handleChange} value={this.state.position_description} type='text' required />

                        {/* Responsibilities */}
                        <label htmlFor='responsibilities'>Responsibilities:</label>
                        {this.state.responsibilities.map((responsibility, i) => (
                            <div key={i} className='array-box'>
                                <input name='responsibilities' type='text' placeholder='Responsibility' value={responsibility.text} onChange={this.handleArrayTextChange(i)} />
                                <button name='responsibilities' type='button' onClick={this.handleRemoveFromArray(i)}>x</button>
                            </div>
                        ))}
                        <button name='responsibilities' type='button' onClick={this.handleAddInput} className='add-input'>Add Responsibility</button>

                        {/* Responsibilities */}
                        <label htmlFor='requirements'>Requirements:</label>
                        {this.state.requirements.map((requirements, i) => (
                            <div key={i} className='array-box'>
                                <input name='requirements' type='text' placeholder='Requirement' value={requirements.text} onChange={this.handleArrayTextChange(i)} />
                                <button name='requirements' type='button' onClick={this.handleRemoveFromArray(i)}>x</button>
                            </div>
                        ))}
                        <button name='requirements' type='button' onClick={this.handleAddInput} className='add-input'>Add Requirement</button>

                        {/* Responsibilities */}
                        <label htmlFor='compensation'>Compensation:</label>
                        {this.state.compensation.map((compensation, i) => (
                            <div key={i} className='array-box'>
                                <input name='compensation' type='text' placeholder='Compensation' value={compensation.text} onChange={this.handleArrayTextChange(i)} />
                                <button name='compensation' type='button' onClick={this.handleRemoveFromArray(i)}>x</button>
                            </div>
                        ))}
                        <button name='compensation' type='button' onClick={this.handleAddInput} className='add-input'>Add Compensation</button>

                        {/* Submit */}
                        <button className='lumaki-btn ' type='submit'>{buttonText}</button>
                    </form>
                    <button onClick={this.handleBackClick} className='return'>Go back</button>
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

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { postNewJob, getJob, updateJob })(JobForm);
