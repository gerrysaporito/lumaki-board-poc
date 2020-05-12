import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ERROR } from '../../../store/actionTypes';
import { removeAlert } from '../../../store/actions/alerts';
import AuthForm from '../../forms/AuthForm';
import LOGO from '../../../images/LumakiLabs_whitelogo.png';
import './css/Auth.css';

class Auth extends Component {
    render() {
        const {history, removeAlert, heading, buttonText, alerts, register, employers} = this.props;
        history.listen(() => {
            removeAlert();
        });


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

function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, { removeAlert })(Auth);
