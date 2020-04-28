import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Content } from '../common/Content';
import './css/Homepage.css';

const Homepage = props => {
    if(props.currentUser.isAuthenticated) {
        return (
            <div>
            </div>
        )
    } else {
        return (
            <div className='mt-5 flex-column justify-content-center align-items-center text-center homepage'>
                <h1>{props.Content.homepage.unauthenticated.title}</h1>
                <h4>{props.Content.homepage.unauthenticated.subTitle}</h4>
                <Link to='/register' className='btn btn-primary'>{props.Content.homepage.unauthenticated.buttonText}</Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        Content: Content,
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {})(Homepage);
