import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Content } from '../../../common/Content';
import { Routes } from '../../../common/Routes';
import ContactForm from '../../forms/ContactForm';
import './css/EmployerRegister.css';

/*
* Page layout for the employer portal before logging in.
*/
class EmployerRegister extends Component {
    render() {
        return(
            <div id='employer-register'>
                <div className='section'>
                    <p className='header'>{Content.register.employers.intro.title}</p>
                    <p>{Content.register.employers.intro.subTitle}</p>
                    <div className='employer-cta'>
                        <Link to={Routes.registerEmployer.url} className='lumaki-btn'>Register</Link>
                        <Link to={Routes.login.url} className='lumaki-btn-outline'>Login</Link>
                    </div>
                    <ContactForm {...Content.forms.contact.employer} />
                </div>
            </div>
        )
    }
}

export default EmployerRegister;
