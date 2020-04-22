import { LOAD_PROJECTS, REMOVE_PROJECT } from '../actionTypes';

const projects = (state = [], action) => {
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
