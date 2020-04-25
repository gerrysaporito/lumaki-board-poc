import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER, ERROR, SUCCESS } from '../actionTypes';
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

export const fetchUserProfile = user_id => {
    return dispatch => {
        return apiCall('get', `/api/auth/users/${user_id}`)
        .then(res => {
            dispatch(setCurrentUser({...res}))
        })
        .catch(err => addAlert(err.message, ERROR));
    };
};

export const updateUserProfile = profile => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/auth/users/${id}`, {...profile})
    .then(res => {
        let msg = 'Success! We just updated your profile for you.';
        dispatch(addAlert(msg, SUCCESS));
    })
    .catch(err => dispatch(addAlert(err.message, ERROR)));
};
