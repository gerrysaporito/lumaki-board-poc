import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewExperience, getExperience, updateExperience } from '../../store/actions/experiences';
import { Content } from '../../common/Content';
import Card from '../../components/Card';
import './css/Form.css'

class ExperienceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            position: '',
            description: '',
            start_date: '',
            end_date: '',
        };
    };

    componentDidMount() {
        if(this.props.location.pathname.split('/').pop() === 'edit') {
            const user_id = this.props.match.params.user_id;
            const experience_id = this.props.match.params.experience_id;
            this.props.getExperience(user_id, experience_id)
            .then(experience => this.setState({
                ...experience,
                start_date: formatDate(experience.start_date),
                end_date: formatDate(experience.end_date),
            }))
            .catch(() => {});
        }
    }

    handleNewExperience = e => {
        e.preventDefault();
        const experience_id = this.props.match.params.experience_id;
        if (this.props.location.pathname.split('/').pop() === 'edit') {
            this.props.updateExperience({...this.state}, experience_id);
        } else {
            this.props.postNewExperience({...this.state});
        }
        this.setState({
            company: '',
            position: '',
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

    handleBackClick = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const buttonText = this.props.location.pathname.split('/').pop() === 'edit' ?
            Content.forms.experience.buttonText.edit : Content.forms.experience.buttonText.create;
        return(
            <Card type='form inline'>
                <form className='form' onSubmit={this.handleNewExperience} >
                    <p className='subheader'>{Content.forms.experience.title}</p>
                    <p>{Content.forms.experience.note}</p>
                    {this.props.alerts === ERROR && this.props.alerts.message && (
                        <div className='alert alert-danger'>
                            {this.props.alerts.message}
                        </div>
                    )}
                    <label htmlFor='company'>Company/Organization:</label>
                    <input id='company' name='company' onChange={this.handleChange} value={this.state.company || ''} type='text' required />
                    <label htmlFor='position'>Position:</label>
                    <input id='position' name='position' onChange={this.handleChange} value={this.state.position || ''} type='text' required />
                    <div className='form-section mt-2'>
                        <div className='form-section-item'>
                            <label htmlFor='start_date'>Start Date:</label>
                            <input id='start_date' name='start_date' onChange={this.handleChange} value={this.state.start_date || ''} type='date' required />
                        </div>
                        <div className='form-section-item'>
                            <label htmlFor='end_date'>End Date:</label>
                            <input id='end_date' name='end_date' onChange={this.handleChange} value={this.state.end_date || ''} type='date' required />
                        </div>
                    </div>
                    <label htmlFor='description'>Description:</label>
                    <textarea id='description' name='description' onChange={this.handleChange} value={this.state.description || ''} required />
                    <button className='lumaki-btn ' type='submit'>{buttonText}</button>
                </form>
                <button onClick={this.handleBackClick} className='return'>Go back</button>
            </Card>
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
    return {
        Content: Content,
    }
}

export default connect(mapStateToProps, { postNewExperience, getExperience, updateExperience })(ExperienceForm);
