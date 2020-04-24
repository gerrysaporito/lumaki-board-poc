import { LOAD_PROJECTS, REMOVE_PROJECT } from '../actionTypes';

const defaultState = [];

const projects = (state = defaultState, action) => {
    switch(action.type) {
        case LOAD_PROJECTS: {
            return [...action.projects]
        }
        case REMOVE_PROJECT: {
            return state.filter(project => project._id !== action.id);
        }
        default: {
            return state;
        }
    }
};

export default projects;
