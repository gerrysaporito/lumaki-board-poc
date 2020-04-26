import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Content from '../common/Content';
import withAuth from '../hocs/WithAuth'
import Navbar from './Navbar';
import Homepage from '../components/Homepage';
import AuthForm from './forms/AuthForm';
import Profile from './Pages/Profile';
import ExperienceForm from './forms/ExperienceForm';
import ProjectForm from './forms/ProjectForm';
import SkillForm from './forms/SkillForm';

import './css/Main.css';

const Main = props => {
    const {Content} = props;
    return(
        <React.Fragment>
            <Navbar {...props} />
            <div className='main'>
                <div className='content'>
                    <Switch>
                        <Route exact path='/login' render={props => <AuthForm {...Content.login} {...props} />} />
                        <Route exact path='/register' render={props => <AuthForm {...Content.register} {...props} />} />
                        <Route exact path='/' render={props => <Homepage {...props} />} />
                        <Route exact path='/users/:id' component={withAuth(Profile)} />
                        <Route path='/users/:id/experiences/new' component={withAuth(ExperienceForm)}/>
                        <Route path='/users/:id/projects/new' component={withAuth(ProjectForm)}/>
                        <Route path='/users/:id/skills/new' component={withAuth(SkillForm)}/>
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    )
};

function mapStateToProps(state) {
    return {
        Content: Content,
    }
}

export default withRouter(connect(mapStateToProps, {})(Main));
