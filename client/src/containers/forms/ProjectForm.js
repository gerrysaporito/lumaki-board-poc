import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewProject } from '../../store/actions/projects';
import './css/Form.css'

class ExperienceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        };
    };

    handleNewExperience = e => {
        e.preventDefault();
        this.props.postNewProject({...this.state});
        this.setState({
            description: '',
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
                    <p>Add details about your project here. You will be redirected to the previous page with your project(s) populated.</p>
                    <h3>PROJECT</h3>
                    {this.props.alerts === ERROR && this.props.alerts.message && (
                        <div className='alert alert-danger'>
                            {this.props.alerts.message}
                        </div>
                    )}
                    <label htmlFor='description'>Description:</label>
                    <textarea id='description' name='description' onChange={this.handleChange} value={this.state.description} required />
                    <button className='btn lumaki-btn btn-md mt-3' type='submit'>Add Project</button>
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

export default connect(mapStateToProps, { postNewProject })(ExperienceForm);
