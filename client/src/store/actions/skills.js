import { apiCall } from '../../services/api';
import { LOAD_SKILLS, REMOVE_SKILL, ERROR } from '../actionTypes';
import { addAlert } from './alerts';

export const loadSkills = skills => ({
    type: LOAD_SKILLS,
    skills
});

export const remove = _id => ({
    type: REMOVE_SKILL,
    _id
});

export const removeSkill = (user_id, skill_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/skills/${skill_id}`)
        .then(() => dispatch(remove(skill_id)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const fetchSkills = _id => {
    return dispatch => {
        return apiCall('get', `/api/users/${_id}/skills/`)
        .then(res => dispatch(loadSkills(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const postNewSkill = skill => (dispatch, getState) => {
    let { currentUser } = getState();
    const _id = currentUser.user._id;
    return apiCall('post', `/api/users/${_id}/skills/`, {...skill})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};
