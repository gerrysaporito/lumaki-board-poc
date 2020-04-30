import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER, ERROR } from '../actionTypes';
import { addAlert, removeAlert } from './alerts';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export function setAuthorizationToken(token) {
    setTokenHeader(token)
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
};

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData)
            .then((user) => {
                localStorage.setItem('jwtToken', user.token);
                setAuthorizationToken(user.token);
                dispatch(setCurrentUser(user));
                dispatch(removeAlert());
                resolve();
            })
            .catch(e => {
                dispatch(addAlert(e, ERROR));
                reject();
            });
        });
    };
};
