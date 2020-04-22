import { apiCall } from '../../services/api';
import { LOAD_PROFILES, REMOVE_PROFILE } from '../actionTypes';
import { addError } from './errors';

export const loadProfiles = profiles => ({
    type: LOAD_PROFILES,
    profiles
});

export const remove = id => ({
    type: REMOVE_PROFILE,
    id
});

export const removeProfile = (user_id, profile_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/profile/${profile_id}`)
        .then(() => dispatch(remove(profile_id)))
        .catch(err => addError(err.message));
    };
};

export const fetchProfiles = () => {
    return dispatch => {
        return apiCall('get', '/api/profile')
        .then(res => dispatch(loadProfiles(res)))
        .catch(err => addError(err.message));
    };
};

export const postNewProfile = text => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/users/${id}/profile`, {text})
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
};
