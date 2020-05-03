import { LOAD_JOBS, REMOVE_JOB } from '../actionTypes';

const DEFAULT_STATE = [];

const posts = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case LOAD_JOBS: {
            return [...action.posts]
        }
        case REMOVE_JOB: {
            return state.filter(post => post._id !== action._id);
        }
        default: {
            return state;
        }
    }
};

export default posts;
