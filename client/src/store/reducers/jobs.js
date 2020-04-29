import { LOAD_JOBS, REMOVE_JOB } from '../actionTypes';

const defaultState = [];

const jobs = (state = defaultState, action) => {
    switch(action.type) {
        case LOAD_JOBS: {
            return [...action.jobs]
        }
        case REMOVE_JOB: {
            return state.filter(job => job._id !== action._id);
        }
        default: {
            return state;
        }
    }
};

export default jobs;
