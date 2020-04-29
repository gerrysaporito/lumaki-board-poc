import { apiCall } from '../../services/api';
import { LOAD_EXPERIENCES, REMOVE_EXPERIENCE, ERROR } from '../actionTypes';
import { addAlert } from './alerts';

export const loadExperiences = experiences => ({
    type: LOAD_EXPERIENCES,
    experiences
});

export const remove = _id => ({
    type: REMOVE_EXPERIENCE,
    _id
});

export const fetchExperiences = _id => {
    return dispatch => {
        return apiCall('get', `/api/users/${_id}/experiences/`)
        .then(res => dispatch(loadExperiences(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const getExperience = (user_id, experience_id) => {
    return dispatch => {
        return apiCall('get', `/api/users/${user_id}/experiences/${experience_id}`)
        .then(res => res)
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const postNewExperience = experience => (dispatch, getState) => {
    let { currentUser } = getState();
    const _id = currentUser.user._id;
    return apiCall('post', `/api/users/${_id}/experiences/`, {...experience})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const updateExperience = (experience, experience_id) => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('post', `/api/users/${user_id}/experiences/${experience_id}`, {...experience})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const removeExperience = (user_id, experience_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/experiences/${experience_id}`)
        .then(() => dispatch(remove(experience_id)))
        .catch(e => addAlert(e.message, ERROR));
    };
};
