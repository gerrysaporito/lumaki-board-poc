import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated: false,
    role: 'wanderer',
    user: {},
};

const currentUser = ( state = DEFAULT_STATE, action ) => {
    switch(action.type) {
        case SET_CURRENT_USER: {
            return {
                isAuthenticated: !!Object.keys(action.user).length,
                role: action.user.role,
                user: action.user,
            };
        }
        default: {
            return state;
        }
    }
}

export default currentUser;
