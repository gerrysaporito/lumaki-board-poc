import { LOAD_SKILLS, REMOVE_SKILL } from '../actionTypes';

const DEFAULT_STATE = [];

const skills = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case LOAD_SKILLS: {
            return [...action.skills]
        }
        case REMOVE_SKILL: {
            return state.filter(skill => skill._id !== action.id);
        }
        default: {
            return state;
        }
    }
};

export default skills;
