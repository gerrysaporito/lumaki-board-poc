import { apiCall } from '../../services/api';
import { LOAD_PROJECTS, REMOVE_PROJECT, ERROR } from '../actionTypes';
import { addAlert } from './alerts';

export const loadProjects = projects => ({
    type: LOAD_PROJECTS,
    projects
});

export const remove = _id => ({
    type: REMOVE_PROJECT,
    _id
});

export const fetchProjects = _id => {
    return dispatch => {
        return apiCall('get', `/api/users/${_id}/projects/`)
        .then(res => dispatch(loadProjects(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const getProject = (user_id, project_id) => {
    return dispatch => {
        return apiCall('get', `/api/users/${user_id}/projects/${project_id}`)
        .then(res => res)
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const postNewProject = project => (dispatch, getState) => {
    let { currentUser } = getState();
    const _id = currentUser.user._id;
    return apiCall('post', `/api/users/${_id}/projects/`, {...project})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const updateProject = (project, project_id) => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('post', `/api/users/${user_id}/projects/${project_id}`, {...project})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const removeProject = (user_id, project_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/projects/${project_id}`)
        .then(() => dispatch(remove(project_id)))
        .catch(e => addAlert(e.message, ERROR));
    };
};
