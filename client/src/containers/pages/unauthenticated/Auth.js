import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthForm from '../../forms/AuthForm';
import LOGO from '../../../images/LumakiLabs_whitelogo.png';
import './css/Auth.css';

/*
* Page layout for the login/signup forms.
*/
class Auth extends Component {
    render() {
        const {heading, buttonText, register, employers} = this.props;

        let form = '';
        if (!register) {
            form = <AuthForm buttonText={buttonText} />
        } else if (employers === undefined) {
            form = <AuthForm buttonText={buttonText} register />
        } else {
            form = <AuthForm buttonText={buttonText} register employers />
        }

        return(
            <div id='auth'>
                <img src={LOGO} alt='LumakiBoard Logo' />
                <p className='mb-5 title'>{heading}</p>
                {form}
            </div>
        )
    }
}

export default Auth;
