import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';

export const addAlert = (error, alertType) => ({
    type: ADD_ALERT,
    alert: alertType,
    error
});

export const removeAlert = () => ({
    type: REMOVE_ALERT
});

export const dispatchAlert = (message, alert) => {
    return dispatch => {
        dispatch(addAlert(message, alert))
    }
}
