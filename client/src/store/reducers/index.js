import { combineReducers } from 'redux';
import currentUser from './currentUser';
import alerts from './alerts';
import experiences from './experiences';
import projects from './projects';
import skills from './skills';

const rootReducer = combineReducers ({
    currentUser,
    alerts,
    experiences,
    projects,
    skills,
});

export default rootReducer;
