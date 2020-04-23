import { apiCall } from '../../services/api';
import { LOAD_PROJECTS, REMOVE_PROJECT } from '../actionTypes';
import { addError } from './errors';

export const loadProjects = projects => ({
    type: LOAD_PROJECTS,
    projects
});

export const remove = id => ({
    type: REMOVE_PROJECT,
    id
});

export const fetchProjects = () => {
    return dispatch => {
        return apiCall('get', '/api/projects')
        .then(res => dispatch(loadProjects(res)))
        .catch(e => addError(e.message));
    };
};

export const postNewProject = text => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/users/${id}/projects`, {text})
    .then(res => {})
    .catch(e => dispatch(addError(e.message)));
};

export const removeProject = (user_id, project_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/projects/${project_id}`)
        .then(() => dispatch(remove(project_id)))
        .catch(e => addError(e.message));
    };
};