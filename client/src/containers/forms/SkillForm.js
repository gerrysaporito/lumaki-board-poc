import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postNewSkill } from '../../store/actions/skills';
import { Content } from '../../common/Content';
import Card from '../../components/general/Card';
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
        const {buttonText, subheader} = this.props;
        return(
            <Card type='form inline'>
                <form onSubmit={this.handleNewSkill} >
                    <p className='subheader'>{subheader}</p>
                    <p>{Content.forms.skill.note}</p>
                    <label htmlFor='skill'>Skill:</label>
                    <input id='skill' name='skill' onChange={this.handleChange} value={this.state.skill || ''} type='text' required />
                    <button className='lumaki-btn ' type='submit'>{buttonText}</button>
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
