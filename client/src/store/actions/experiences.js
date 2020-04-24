import { apiCall } from '../../services/api';
import { LOAD_EXPERIENCES, REMOVE_EXPERIENCE, ERROR } from '../actionTypes';
import { addAlert } from './alerts';

export const loadExperiences = experiences => ({
    type: LOAD_EXPERIENCES,
    experiences
});

export const remove = id => ({
    type: REMOVE_EXPERIENCE,
    id
});

export const fetchExperiences = () => {
    return dispatch => {
        return apiCall('get', '/api/experiences')
        .then(res => dispatch(loadExperiences(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const postNewExperience = experience => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/users/${id}/experiences/`, {...experience})
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
