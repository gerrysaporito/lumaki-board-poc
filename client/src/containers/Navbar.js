import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

import LOGO from '../images/LumakiLabs_SmallLogo_W.png';
import './css/Navbar.css';

class Navbar extends Component {

    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        return(
            <nav className='navbar navbar-expand-lg navbar-dark'>
                <div className='navbar-header'>
                    <NavLink to='/' className='navbar-brand'>
                        <img src={LOGO} alt='LumakiBoard Logo' />
                        <h1 className='hidden'>lumaki</h1>
                        <h1 className='hidden'>board</h1>
                    </NavLink>
                </div>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse flex-column justify-content-between' id='navbarNav'>
                    <ul className='nav flex-column'>
                        <li className='nav-item'>
                            <NavLink to={`/jobs/all`}  activeClassName='active-link'>
                                All Postings
                            </NavLink>
                        </li>
                        {this.props.currentUser.isAuthenticated ?
                            (<React.Fragment>
                                <li className='nav-item'>
                                    <NavLink to={`/users/${this.props.currentUser.user.id}`}  activeClassName='active-link'>
                                        Profile
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <a onClick={this.logout} href='#'>
                                        Log out
                                    </a>
                                </li>
                            </React.Fragment>)
                        :
                            (<React.Fragment>
                                <li className='nav-item'>
                                    <NavLink to={'/about'}  activeClassName='active-link'>About</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to={'/faq'}  activeClassName='active-link'>FAQ</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/register' activeClassName='active-link'>Sign Up</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/login' activeClassName='active-link'>Log In</NavLink>
                                </li>
                            </React.Fragment>)
                        }
                    </ul>
                    <ul className='nav flex-column'>
                        <li className='nav-item'>
                            <NavLink to={`/contact`} activeClassName='active-link'>
                                Contact
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to={`/support`} activeClassName='active-link'>
                                Support
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, {logout})(Navbar);