import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewSkill } from '../../store/actions/skills';
import { Content } from '../../common/Content';
import Card from '../../components/Card';
import './css/Form.css';

class SkillForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: [],
        };
    };

    handleNewSkill = e => {
        e.preventDefault();

        this.props.postNewSkill({
            ...this.state,
            skill: this.state.skill.split(','),
        });
        this.setState({
            skill: [],
        });
        this.props.history.goBack();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleBackClick = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return(
            <Card type='form inline'>
                <form onSubmit={this.handleNewSkill} >
                    <p className='subheader'>{Content.forms.skill.title}</p>
                    <p>{Content.forms.skill.note}</p>
                    {this.props.alerts === ERROR && this.props.alerts.message && (
                        <div className='alert alert-danger'>
                            {this.props.alerts.message}
                        </div>
                    )}
                    <label htmlFor='skill'>Skill:</label>
                    <input id='skill' name='skill' onChange={this.handleChange} value={this.state.skill || ''} type='text' required />
                    <button className='lumaki-btn ' type='submit'>{Content.forms.skill.buttonText}</button>
                </form>
                <button onClick={this.handleBackClick} className='return'>Go back</button>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        Content: Content,
    }
}

export default connect(mapStateToProps, { postNewSkill })(SkillForm);
