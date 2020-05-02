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

        if(currentUser.isAuthenticated) {
            switch(currentUser.user.profile_type) {
                case Profiles.admin: {
                    mainTabs.push(createTab(mainTabs.length, `/jobs`, 'All Postings'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}`, 'Company Profile'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/postings`, 'My Postings'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/postings/new`, 'Post a job'));
                    break;
                }
                case Profiles.admin: {
                    mainTabs.push(createTab(mainTabs.length, `/jobs`, 'All Postings'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}`, 'Company Profile'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/postings`, 'My Postings'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/postings/new`, 'Post a job'));
                    break;
                }
                case Profiles.employer: {
                    mainTabs.push(createTab(mainTabs.length, `/jobs`, 'All Postings'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}`, 'Company Profile'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/postings`, 'My Postings'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/postings/new`, 'Post a job'));
                    break;
                }
                case Profiles.student: {
                    mainTabs.push(createTab(mainTabs.length, `/jobs`, 'All Postings'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}`, 'My Profile'));
                    mainTabs.push(createTab(mainTabs.length, `/users/${currentUser.user._id}/jobs/applications`, 'My Applications'));
                    break;
                }
                default: {
                    break;
                }
            }
            mainTabs.push(<li key={mainTabs.length} className='nav-item'>
                <button onClick={this.logout} href='#'>Log out</button>
            </li>);
        } else {
            mainTabs.push(createTab(mainTabs.length, `/about`, 'About'));
            mainTabs.push(createTab(mainTabs.length, `/login`, 'Log In'));
            mainTabs.push(createTab(mainTabs.length, `/register`, 'Sign Up'));
            mainTabs.push(createTab(mainTabs.length, `/employer/`, 'For Employers'));
        }

        supportTabs.push(createTab(supportTabs.length, `/faq`, 'FAQ'));
        supportTabs.push(createTab(supportTabs.length, `/contact`, 'Contact'));

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
    };
}

export default connect(mapStateToProps, {logout})(Navbar);