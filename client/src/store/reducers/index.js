import { combineReducers } from 'redux';
import currentUser from './currentUser';
import alerts from './alerts';
import experiences from './experiences';
import projects from './projects';
import skills from './skills';
import jobs from './jobs';

const rootReducer = combineReducers ({
    currentUser,
    alerts,
    experiences,
    projects,
    skills,
    jobs,
});

export default rootReducer;
