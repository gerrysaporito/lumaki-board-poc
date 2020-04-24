import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { removeAlert } from '../store/actions/alerts';
import withAuth from '../hocs/WithAuth'
import Navbar from './Navbar';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import ProfileForm from '../components/ProfileForm';

import './css/Main.css';

const Main = props => {
    const {alerts, removeAlert, currentUser} = props;
    return(
        <React.Fragment>
            <Navbar {...props} />
            <div className='main'>
                <div className='content'>
                    <Switch>
                        <Route exact path='/' render={props =>
                            <Homepage
                                currentUser={currentUser}
                                {...props}
                            />}
                        />
                        <Route exact path='/users/:id'
                        //component={withAuth(ProfileForm, props)}
                        render={props =>
                            <ProfileForm
                                removeAlert={removeAlert}
                                alerts={alerts}
                                currentUser={currentUser}
                                {...props}
                            />}
                        />
                        <Route exact path='/login' render={props =>
                            <AuthForm
                                removeAlert={removeAlert}
                                alerts={alerts}
                                buttonText='Log in'
                                heading='Welcome Back.'
                                {...props}
                            />}
                        />
                        <Route exact path='/register' render={props =>
                            <AuthForm
                                currentUser={currentUser}
                                removeAlert={removeAlert}
                                alerts={alerts}
                                buttonText="Let's go!"
                                heading='Apply for your next internship today.'
                                register
                                {...props}
                            />}
                        />
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    )
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        alerts: state.alerts,
    }
}

export default withRouter(connect(mapStateToProps, { removeAlert })(Main));
