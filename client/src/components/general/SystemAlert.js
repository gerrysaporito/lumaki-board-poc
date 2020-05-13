import React, { Component } from 'react';

import { ERROR, SUCCESS } from '../../store/actionTypes';

import './css/SystemAlert.css'

class SystemAlert extends Component {
    closeAlert = e => {
        e.preventDefault();
        this.props.removeAlert();
    }
    render() {
        const {message, alert, history, removeAlert} = this.props;
        history.listen(() => {
            removeAlert();
        });
        let color = '';
        switch(alert) {
            case ERROR: {
                color += 'danger ';
                break;
            }
            case SUCCESS: {
                color += 'success ';
                break;
            }
            default: {
                return (<div />);
            }
        }
        return (
            <div id='system-alert' className={color}>
                <p className='subheader'>{message}</p>
                <button onClick={this.closeAlert}>x</button>
            </div>
        )
    }
}

export default SystemAlert;
