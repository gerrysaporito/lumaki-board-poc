import { apiCall } from '../../services/api';
import { LOAD_SKILLS, REMOVE_SKILL } from '../actionTypes';
import { addError } from './errors';

export const loadSkills = skills => ({
    type: LOAD_SKILLS,
    skills
});

export const remove = id => ({
    type: REMOVE_SKILL,
    id
});

export const removeSkill = (user_id, skill_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/skills/${skill_id}`)
        .then(() => dispatch(remove(skill_id)))
        .catch(e => addError(e.message));
    };
};

export const fetchSkills = () => {
    return dispatch => {
        return apiCall('get', '/api/skills')
        .then(res => dispatch(loadSkills(res)))
        .catch(e => addError(e.message));
    };
};

export const postNewSkill = text => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/users/${id}/skills`, {text})
    .then(res => {})
    .catch(e => dispatch(addError(e.message)));
};
