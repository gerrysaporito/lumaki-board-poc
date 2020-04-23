import React from 'react';
import { Link } from 'react-router-dom';

import './css/Homepage.css';

const Homepage = ({ currentUser }) => {
    if(currentUser.isAuthenticated) {
        return (
            <div>
            </div>
        )
    } else {
        return (
            <div className='mt-5 flex-column justify-content-center align-items-center text-center homepage'>
                <h1>What's Happening?</h1>
                <h4>New to the LumakiBoard?</h4>
                <Link to='/register' className='btn btn-primary'>Sign up here</Link>
            </div>
        )
    }
}

export default Homepage;
