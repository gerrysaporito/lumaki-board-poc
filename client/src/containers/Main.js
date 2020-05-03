import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Content } from '../common/Content';
import { Profiles } from '../common/Definitions';
import { Routes } from '../common/Routes';
import withAuth from '../hocs/WithAuth'
import withoutAuth from '../hocs/WithoutAuth'
// import withAdminAuth from '../hocs/WithAdminAuth';
import Navbar from './Navbar';
// Pages
import Homepage from '../components/Homepage';
import FAQ from './Pages/FAQ';
import Profile from './Pages/Profile';
import Contact from './Pages/Contact';
import AllPosts from './Pages/AllPosts';
import Post from './Pages/Post';
import EmployerRegister from './Pages/EmployerRegister';
import CompanyPosts from './Pages/CompanyPosts';
// Forms
import AuthForm from './forms/AuthForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectForm from './forms/ProjectForm';
import SkillForm from './forms/SkillForm';
import PostForm from './forms/PostForm';

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
                        <Route exact path={Routes.login.url} component={withoutAuth(AuthForm, Content.login)} />
                        <Route exact path={Routes.register.url} component={withoutAuth(AuthForm, Content.register.student)} />
                        <Route exact path={Routes.employer.url} render={props => <EmployerRegister {...Content.register.employers} {...props} />} />
                        <Route exact path={Routes.registerEmployer.url}  component={withoutAuth(AuthForm, Content.register.employers.register)} />
                        <Route exact path={Routes.home.url} render={props => <Homepage {...props} />} />
                        <Route exact path={Routes.allPosts.url} render={props => <AllPosts {...props} />} />
                        <Route exact path={Routes.singlePost.url} render={props => <Post {...props} />}  />
                        <Route exact path={Routes.contact.url} render={props => <Contact {...props} />}  />
                        <Route exact path={Routes.faq.url} render={props => <FAQ {...props} />}  />
                        {/* User */}
                        <Route exact path={Routes.profile.url}  component={withAuth(Profile, true)} />
                        <Route exact path={Routes.createExperience.url} component={withAuth(ExperienceForm, profile_type === Profiles.student)}/>
                        <Route exact path={Routes.editExperience.url} component={withAuth(ExperienceForm, profile_type === Profiles.student)}/>
                        <Route exact path={Routes.createProject.url} component={withAuth(ProjectForm, profile_type === Profiles.student)}/>
                        <Route exact path={Routes.editProject.url} component={withAuth(ProjectForm, profile_type === Profiles.student)}/>
                        <Route exact path={Routes.createSkill.url} component={withAuth(SkillForm, profile_type === Profiles.student)}/>
                        <Route exact path={Routes.editSkill.url} component={withAuth(SkillForm, profile_type === Profiles.student)}/>
                        {/* Employer */}
                        <Route exact path={Routes.createPost.url} component={withAuth(PostForm, profile_type === Profiles.employer)}/>
                        <Route exact path={Routes.editPost.url} component={withAuth(PostForm, profile_type === Profiles.employer)}/>
                        <Route exact path={Routes.companyPosts.url} component={withAuth(CompanyPosts, profile_type === Profiles.employer)}/>
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
