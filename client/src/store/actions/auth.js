import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

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
    console.log()
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
            .then(({token, ...user}) => {
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                dispatch(setCurrentUser(user));
                dispatch(removeError());
                resolve();
            })
            .catch(e => {
                dispatch(addError(e));
                reject();
            });
        });
    };
};
