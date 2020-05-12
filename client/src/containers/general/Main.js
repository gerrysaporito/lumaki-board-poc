import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import { Profiles, Forms } from '../../common/Definitions';
import { Routes } from '../../common/Routes';
import { removeAlert } from '../../store/actions/alerts';
// HOCS
import withAuth from '../../hocs/WithAuth'
import withoutAuth from '../../hocs/WithoutAuth'
// import withAdminAuth from '../hocs/WithAdminAuth';
import Navbar from './Navbar';
import SystemAlert from '../../components/general/SystemAlert';
// Pages
import Homepage from '../pages/unauthenticated/Homepage';
import FAQ from '../pages/unauthenticated/FAQ';
import Profile from '../pages/general/Profile';
import Contact from '../pages/unauthenticated/Contact';
import AllPosts from '../pages/unauthenticated/AllPosts';
import Post from '../pages/unauthenticated/Post';
import EmployerRegister from '../pages/unauthenticated/EmployerRegister';
import MyPostings from '../pages/employer/MyPostings';
import ViewApplicants from '../pages/employer/ViewApplicants';
import SinglePostApplicants from '../pages/employer/SinglePostApplicants';
import StudentProfileSummary from '../pages/employer/StudentProfileSummary';
// Forms
import Auth from '../pages/unauthenticated/Auth';
import './css/Main.css';
import Form from '../pages/general/Form';

const Main = props => {
    const {profile_type, alerts, history, removeAlert} = props;
    return(
        <React.Fragment>
            <Navbar {...props} />
            <div className='main'>
                <div className='content'>
                    <SystemAlert {...alerts} history={history} removeAlert={removeAlert} />
                    <Switch>
                        {/* Wanderer */}
                        <Route exact path={Routes.login.url} component={withoutAuth(Auth, Content.login)} />
                        <Route exact path={Routes.register.url} component={withoutAuth(Auth, Content.register.student)} />
                        <Route exact path={Routes.employer.url} render={props => <EmployerRegister {...Content.register.employers} {...props} />} />
                        <Route exact path={Routes.registerEmployer.url}  component={withoutAuth(Auth, Content.register.employers.register)} />
                        <Route exact path={Routes.home.url} render={props => <Homepage {...props} />} />
                        <Route exact path={Routes.allPosts.url} render={props => <AllPosts {...props} />} />
                        <Route exact path={Routes.singlePost.url} render={props => <Post {...props} />}  />
                        <Route exact path={Routes.contact.url} render={props => <Contact {...props} />}  />
                        <Route exact path={Routes.faq.url} render={props => <FAQ {...props} />}  />
                        {/* User */}
                        <Route exact path={Routes.profile.url}  component={withAuth(Profile, true)} />
                        <Route exact path={Routes.createExperience.url} component={withAuth(Form, profile_type === Profiles.student, {formType: Forms.experience})}/>
                        <Route exact path={Routes.editExperience.url} component={withAuth(Form, profile_type === Profiles.student, {formType: Forms.experience})}/>
                        <Route exact path={Routes.createProject.url} component={withAuth(Form, profile_type === Profiles.student, {formType: Forms.project})}/>
                        <Route exact path={Routes.editProject.url} component={withAuth(Form, profile_type === Profiles.student, {formType: Forms.project})}/>
                        <Route exact path={Routes.createSkill.url} component={withAuth(Form, profile_type === Profiles.student, {formType: Forms.skill})}/>
                        <Route exact path={Routes.editSkill.url} component={withAuth(Form, profile_type === Profiles.student, {formType: Forms.skill})}/>
                        {/* Employer */}
                        <Route exact path={Routes.createPost.url} component={withAuth(Form, profile_type === Profiles.employer, {formType: Forms.post})}/>
                        <Route exact path={Routes.editPost.url} component={withAuth(Form, profile_type === Profiles.employer, {formType: Forms.post})}/>
                        <Route exact path={Routes.MyPostings.url} component={withAuth(MyPostings, profile_type === Profiles.employer)}/>
                        <Route exact path={Routes.ViewApplicants.url} component={withAuth(ViewApplicants, profile_type === Profiles.employer)}/>
                        <Route exact path={Routes.SinglePostApplicants.url} component={withAuth(SinglePostApplicants, profile_type === Profiles.employer)}/>
                        <Route exact path={Routes.profileSummary.url} component={withAuth(StudentProfileSummary, profile_type === Profiles.employer)}/>
                    </Switch>
                </div>
            </div>
        </React.Fragment>
    )
};

function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        profile_type: state.currentUser.user.profile_type,
    }
}

export default withRouter(connect(mapStateToProps, {removeAlert})(Main));
