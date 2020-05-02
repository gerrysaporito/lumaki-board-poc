import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Content } from '../common/Content';
import { Profiles } from '../common/Definitions';
import withAuth from '../hocs/WithAuth'
// import withAdminAuth from '../hocs/WithAdminAuth';
import Navbar from './Navbar';
// Pages
import Homepage from '../components/Homepage';
import FAQ from './Pages/FAQ';
import Profile from './Pages/Profile';
import Contact from './Pages/Contact';
import AllJobs from './Pages/AllJobs';
import Job from './Pages/Job';
import EmployerRegister from './Pages/EmployerRegister';
// Forms
import AuthForm from './forms/AuthForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectForm from './forms/ProjectForm';
import SkillForm from './forms/SkillForm';
import JobForm from './forms/JobForm';

import './css/Main.css';

const Main = props => {
    const {profile_type} = props;
    return(
        <React.Fragment>
            <Navbar {...props} />
            <div className='main'>
                <div className='content'>
                    <Switch>
                        {/* Wanderer */}
                        <Route exact path='/login' render={props => <AuthForm {...Content.login} {...props} />} />
                        <Route exact path='/register' render={props => <AuthForm {...Content.register.student} {...props} />} />
                        <Route exact path='/employer' render={props => <EmployerRegister {...Content.register.employers} {...props} />} />
                        <Route exact path='/employer/register' render={props => <AuthForm {...Content.register.employers.register} {...props} />} />
                        <Route exact path='/' render={props => <Homepage {...props} />} />
                        <Route exact path='/jobs' render={props => <AllJobs {...props} />} />
                        <Route exact path='/jobs/:job_id' render={props => <Job {...props} />}  />
                        <Route exact path='/contact' render={props => <Contact {...props} />}  />
                        <Route exact path='/faq' render={props => <FAQ {...props} />}  />
                        {/* Users */}
                        <Route exact path='/users/:user_id' component={withAuth(Profile, true)} />
                        <Route exact path='/users/:user_id/experiences/new' component={withAuth(ExperienceForm, profile_type === Profiles.student)}/>
                        <Route exact path='/users/:user_id/experiences/:experience_id/edit' component={withAuth(ExperienceForm, profile_type === Profiles.student)}/>
                        <Route exact path='/users/:user_id/projects/new' component={withAuth(ProjectForm, profile_type === Profiles.student)}/>
                        <Route exact path='/users/:user_id/projects/:project_id/edit' component={withAuth(ProjectForm, profile_type === Profiles.student)}/>
                        <Route exact path='/users/:user_id/skills/new' component={withAuth(SkillForm, profile_type === Profiles.student)}/>
                        <Route exact path='/users/:user_id/skills/:skill_id/edit' component={withAuth(SkillForm, profile_type === Profiles.student)}/>
                        {/* Admin */}
                        <Route exact path='/users/:user_id/jobs/new' component={withAuth(JobForm, profile_type === Profiles.employer)}/>
                        <Route exact path='/users/:user_id/jobs/:job_id/edit' component={withAuth(JobForm, profile_type === Profiles.employer)}/>
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    )
};

function mapStateToProps(state) {
    return {
        profile_type: state.currentUser.user.profile_type,
    }
}

export default withRouter(connect(mapStateToProps, {})(Main));
