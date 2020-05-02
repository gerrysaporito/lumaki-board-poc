import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import ContactForm from '../forms/ContactForm';
import './css/EmployerRegister.css';

class EmployerRegister extends Component {
    render() {
        return(
            <div className='mt-5' id='employer-register'>
                <div className='section'>
                    <h3><strong>{Content.register.employers.intro.title}</strong></h3>
                    <p>{Content.register.employers.intro.subTitle}</p>
                    <div className='cta'>
                        <Link to='/employer/register' className='lumaki-btn'><strong>Register</strong></Link>
                        <Link to='/login' className='lumaki-btn-outline'><strong>Login</strong></Link>
                    </div>
                    <ContactForm {...Content.forms.contact.employer} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(EmployerRegister);
