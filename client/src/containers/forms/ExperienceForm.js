import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewExperience } from '../../store/actions/experiences';
import './css/Form.css'

class ExperienceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            role: '',
            description: '',
            start_date: '',
            end_date: '',
        };
    };

    handleNewExperience = e => {
        e.preventDefault();
        this.props.postNewExperience({...this.state});
        this.setState({
            company: '',
            role: '',
            description: '',
            start_date: '',
            end_date: '',
        });
        this.props.history.goBack();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <div className='form'>
                <form onSubmit={this.handleNewExperience} >
                    <p>Add details about your experience here. You will be redirected to the previous page with your experience(s) populated.</p>
                    <h3>EXPERIENCE</h3>
                    {this.props.alerts === ERROR && this.props.alerts.message && (
                        <div className='alert alert-danger'>
                            {this.props.alerts.message}
                        </div>
                    )}
                    <label htmlFor='company'>Company/Organization:</label>
                    <input id='company' name='company' onChange={this.handleChange} value={this.state.company} type='text' required />
                    <label htmlFor='role'>Role:</label>
                    <input id='role' name='role' onChange={this.handleChange} value={this.state.role} type='text' required />
                    <div className='date-section mt-2'>
                        <div className='date-item'>
                            <label htmlFor='start_date'>Start Date:</label>
                            <input id='start_date' name='start_date' onChange={this.handleChange} value={this.state.start_date} type='date' required />
                        </div>
                        <div className='date-item'>
                            <label htmlFor='end_date'>End Date:</label>
                            <input id='end_date' name='end_date' onChange={this.handleChange} value={this.state.end_date} type='date' required />
                        </div>
                    </div>
                    <label htmlFor='description'>Description:</label>
                    <textarea id='description' name='description' onChange={this.handleChange} value={this.state.description} required />
                    <button className='btn lumaki-btn btn-md mt-3' type='submit'>Add Experience</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts
    }
}

export default connect(mapStateToProps, { postNewExperience })(ExperienceForm);
