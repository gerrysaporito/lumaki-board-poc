import { combineReducers } from 'redux';
import currentUser from './currentUser';
import alerts from './alerts';
import experiences from './experiences';
import projects from './projects';
import skills from './skills';
import posts from './posts';
import profile from './profiles';

const rootReducer = combineReducers ({
    currentUser,
    alerts,
    experiences,
    projects,
    skills,
    posts,
    profile,
});

export default rootReducer;
