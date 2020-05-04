import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

import { NavbarRoutes, Routes } from '../common/Routes';

import LOGO from '../images/LumakiLabs_SmallLogo_W.png';
import './css/Navbar.css';

class Navbar extends Component {

    logout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push(Routes.home.url)
    }

    render() {
        const {currentUser} = this.props;
        let mainTabs = [];

        if(currentUser.isAuthenticated) {
            mainTabs = NavbarRoutes[currentUser.user.profile_type].map((tab, i) => (
                <li key={i} className='nav-item'>
                    <NavLink exact to={tab.url.replace(':user_id', currentUser.user._id)}  activeClassName='active-link'>
                        {tab.text}
                    </NavLink>
                </li>
            ));
            mainTabs.push(<li key={mainTabs.length} className='nav-item'>
                <button onClick={this.logout} href='#'>Log out</button>
            </li>);
        } else {
            mainTabs = NavbarRoutes.default.map((tab, i) => (
                <li key={i} className='nav-item'>
                    <NavLink exact to={tab.url}  activeClassName='active-link'>
                        {tab.text}
                    </NavLink>
                </li>
            ));
        }

        return(
            <nav className='navbar navbar-expand-lg navbar-dark'>
                <div className='navbar-header mb-lg-4 mt-lg-3'>
                    <NavLink exact to={Routes.home.url} className='navbar-brand'>
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
                        {NavbarRoutes.other.map((tab, i) => (
                            <li key={i} className='nav-item'>
                                <NavLink exact to={tab.url}  activeClassName='active-link'>
                                    {tab.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        )
    }
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, {logout})(Navbar);