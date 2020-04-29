import { SET_PROFILE } from '../actionTypes';

const DEFAULT_STATE = {};

const profile = ( state = DEFAULT_STATE, action ) => {
    switch(action.type) {
        case SET_PROFILE: {
            return {
                ...action.profile
            };
        }
        default: {
            return state;
        }
    }
}

export default profile;
