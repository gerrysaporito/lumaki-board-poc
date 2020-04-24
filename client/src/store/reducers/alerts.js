import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';

const alerts = (state = {alert: null, message: null}, action) => {
    switch(action.type) {
        case ADD_ALERT: {
            return { ...state, alert: action.alert, message: action.error };
        }
        case REMOVE_ALERT: {
            return { ...state, alert: null, message: null };
        }
        default: {
            return state;
        }
    }
};

export default alerts;
