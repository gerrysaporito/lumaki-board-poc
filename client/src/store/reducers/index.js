import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import profile from './profile';
import experiences from './experiences';
import projects from './projects';
import skills from './skills';

const rootReducer = combineReducers ({
    currentUser,
    errors,
    profile,
    experiences,
    projects,
    skills,
});

export default rootReducer;
