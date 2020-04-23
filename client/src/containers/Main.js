import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/WithAuth'
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';

import './css/Main.css';

const Main = props => {
    const {authUser, errors, removeError, currentUser} = props;
    return(
        <div className='main'>
            <div className='content'>
                <Switch>
                    <Route exact path='/' render={props =>
                        <Homepage
                            currentUser={currentUser}
                            {...props}
                        />}
                    />
                    <Route exact path='/login' render={props =>
                        <AuthForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={authUser}
                            buttonText='Log in'
                            heading='Welcome Back.'
                            {...props}
                        />}
                    />
                    <Route exact path='/register' render={props =>
                        <AuthForm
                        removeError={removeError}
                        errors={errors}
                        onAuth={authUser}
                            buttonText="Let's go!"
                            heading='Apply for your next internship today.'
                            register
                            {...props}
                        />}
                    />
                </Switch>
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
    }
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
