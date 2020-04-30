import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

import { Profiles } from '../common/Definitions';

import LOGO from '../images/LumakiLabs_SmallLogo_W.png';
import './css/Navbar.css';

class Navbar extends Component {

    logout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/')
    }

    render() {
        const {currentUser} = this.props;
        let mainTabs = [];
        let supportTabs = [];
        mainTabs.push(createTab(mainTabs.length, `/jobs`, 'All Postings'));
        if(currentUser.isAuthenticated) {
            mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}`, 'Profile'));
            mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/new`, 'Post a job'));
            mainTabs.push(<li key={mainTabs.length} className='nav-item'>
                <button onClick={this.logout} href='#'>Log out</button>
            </li>);
        } else {
            mainTabs.push(createTab(mainTabs.length, `/about`, 'About'));
            mainTabs.push(createTab(mainTabs.length, `/register`, 'Sign Up'));
            mainTabs.push(createTab(mainTabs.length, `/login`, 'Log In'));
        }

        supportTabs.push(createTab(supportTabs.length, `/contact`, 'Contact'));
        supportTabs.push(createTab(supportTabs.length, `/support`, 'Support'));

        return(
            <nav className='navbar navbar-expand-lg navbar-dark'>
                <div className='navbar-header mb-lg-4 mt-lg-3'>
                    <NavLink exact to='/' className='navbar-brand'>
                        <img src={LOGO} alt='LumakiBoard Logo' />
                        <h2 className='hidden mb-0'>lumaki</h2>
                        <h2 className='hidden'>board</h2>
                    </NavLink>
                </div>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse flex-column justify-content-between' id='navbarNav'>
                    <ul className='nav flex-column'>
                        {mainTabs}
                    </ul>
                    <ul className='nav flex-column'>
                        {supportTabs}
                    </ul>
                </div>
            </nav>
        )
    }
};

function createTab(key, url, text) {
    return (
        <li key={key} className='nav-item'>
            <NavLink exact to={url}  activeClassName='active-link'>
                {text}
            </NavLink>
        </li>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        Profiles: Profiles,
    };
}

export default connect(mapStateToProps, {logout})(Navbar);