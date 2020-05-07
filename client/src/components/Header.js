import React, { Component } from 'react';

import '../containers/forms/css/Form.css'

class Header extends Component {
    handleBackClick = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return(
            <div className='form-header'>
                <p className='header'>{this.props.header}</p>
                <button onClick={this.handleBackClick} className='return'>Go back</button>
            </div>
        )
    }
}

export default Header;
