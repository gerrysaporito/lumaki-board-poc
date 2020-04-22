import { LOAD_PROFILE, REMOVE_PROFILE } from '../actionTypes';

const profile = (state = [], action) => {
    switch(action.type) {
        case LOAD_PROFILE: {
            return [...action.profile]
        }
        case REMOVE_PROFILE: {
            return state.filter(profile => profile._id !== action.id);
        }
        default: {
            return state;
        }
    }
};

export default profile;
