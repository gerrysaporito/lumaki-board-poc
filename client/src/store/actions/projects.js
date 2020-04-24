import { apiCall } from '../../services/api';
import { LOAD_PROJECTS, REMOVE_PROJECT, ERROR } from '../actionTypes';
import { addAlert } from './alerts';

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
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const postNewProject = project => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/users/${id}/projects/`, {...project})
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
