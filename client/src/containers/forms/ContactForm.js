import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewExperience, getExperience, updateExperience } from '../../store/actions/experiences';
import { Content } from '../../common/Content';
import Card from '../../components/general/Card';
import './css/Form.css';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            name: '',
            email: '',
            message: '',
        };
    };

    handleMessage = e => {
        e.preventDefault();
        this.props.postNewExperience({...this.state});
        this.setState({
            company: '',
            name: '',
            email: '',
            message: '',
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {title, subTitle, subject, contactPerson, contactMethod, messageTitle, buttonText} = this.props;
        return(
            <Card type='inline form'>
                <div className='form'>
                    <div>
                        <form onSubmit={this.handleNewExperience} >
                            <p className='subheader'>{title}</p>
                            <p>{subTitle}</p>
                            <label htmlFor='company'>{subject}</label>
                            <input id='company' name='company' onChange={this.handleChange} value={this.state.company || ''} type='text' required />
                            <label htmlFor='name'>{contactPerson}</label>
                            <input id='name' name='name' onChange={this.handleChange} value={this.state.name || ''} type='text' required />
                            <label htmlFor='email'>{contactMethod}</label>
                            <input id='email' name='email' onChange={this.handleChange} value={this.state.email || ''} type='text' required />
                            <label htmlFor='message'>{messageTitle}</label>
                            <textarea id='message' name='message' onChange={this.handleChange} value={this.state.message || ''} required />
                            <button className='lumaki-btn ' type='submit'>{buttonText}</button>
                        </form>
                    </div>
                </div>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        Content: Content,
    }
}

export default connect(mapStateToProps, { postNewExperience, getExperience, updateExperience })(ContactForm);
