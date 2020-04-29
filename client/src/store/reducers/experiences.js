import { LOAD_EXPERIENCES, REMOVE_EXPERIENCE } from '../actionTypes';

const DEFAULT_STATE = [];

const experiences = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case LOAD_EXPERIENCES: {
            return [...action.experiences]
        }
        case REMOVE_EXPERIENCE: {
            return state.filter(experience => experience._id !== action._id);
        }
        default: {
            return state;
        }
    }
};

export default experiences;
