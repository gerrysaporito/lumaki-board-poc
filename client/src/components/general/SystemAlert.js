import React from 'react';

import { ERROR, SUCCESS } from '../../store/actionTypes';

import './css/SystemAlert.css'

const SystemAlert = ({message, alert}) => {
    console.log(message, alert)
    switch(alert) {
        case ERROR: {
            return(
                <div id='system-message' className='danger'>
                    <p className='subheader'>{message}</p>
                </div>
            )
        }
        case SUCCESS: {
            return(
                <div id='system-message' className='success'>
                    <p className='subheader'>{message}</p>
                </div>
            )
        }
        default: {
            return (<div />);
        }
    }
}

export default SystemAlert;
