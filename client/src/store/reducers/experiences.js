import { LOAD_EXPERIENCES, REMOVE_EXPERIENCE } from '../actionTypes';

const experiences = (state = [], action) => {
    switch(action.type) {
        case LOAD_EXPERIENCES: {
            return [...action.experiences]
        }
        case REMOVE_EXPERIENCE: {
            return state.filter(experience => experience._id !== action.id);
        }
        default: {
            return state;
        }
    }
};

export default experiences;
