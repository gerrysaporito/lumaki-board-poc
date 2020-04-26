import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewSkill } from '../../store/actions/skills';
import Content from '../../common/Content'
import './css/Form.css'

class ExperienceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: '',
        };
    };

    handleNewExperience = e => {
        e.preventDefault();
        this.props.postNewSkill({...this.state});
        this.setState({
            skill: '',
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
                    <p>{this.props.Content.forms.skill.note}</p>
                    <h3>{this.props.Content.forms.skill.title}</h3>
                    {this.props.alerts === ERROR && this.props.alerts.message && (
                        <div className='alert alert-danger'>
                            {this.props.alerts.message}
                        </div>
                    )}
                    <label htmlFor='skill'>Skill:</label>
                    <input id='skill' name='skill' onChange={this.handleChange} value={this.state.skill} type='text' required />
                    <button className='btn lumaki-btn btn-md mt-3' type='submit'>{this.props.Content.forms.skill.buttonText}</button>
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

export default connect(mapStateToProps, { postNewSkill })(ExperienceForm);
