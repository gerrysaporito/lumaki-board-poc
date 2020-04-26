import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewProject } from '../../store/actions/projects';
import Content from '../../common/Content';
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
                    <p>{this.props.Content.forms.project.note}</p>
                    <h3>{this.props.Content.forms.project.title}</h3>
                    {this.props.alerts === ERROR && this.props.alerts.message && (
                        <div className='alert alert-danger'>
                            {this.props.alerts.message}
                        </div>
                    )}
                    <label htmlFor='description'>Description:</label>
                    <textarea id='description' name='description' onChange={this.handleChange} value={this.state.description} required />
                    <button className='btn lumaki-btn btn-md mt-3' type='submit'>{this.props.Content.forms.project.buttonText}</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        Content: Content,
    }
}

export default connect(mapStateToProps, { postNewProject })(ExperienceForm);
