import React, { Component } from 'react';

import './css/Header.css'

class Header extends Component {
    handleBackClick = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        return(
            <div className='page-header'>
                <p className='header'>{this.props.header}</p>
                <button onClick={this.handleBackClick} className='return'>Go back</button>
            </div>
        )
    }
}

export default Header;
