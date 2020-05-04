import { apiCall } from '../../services/api';
import { LOAD_JOBS, REMOVE_JOB, ERROR, SUCCESS } from '../actionTypes';
import { addAlert } from './alerts';

export const loadPosts = posts => ({
    type: LOAD_JOBS,
    posts
});

export const remove = _id => ({
    type: REMOVE_JOB,
    _id
});

export const fetchPosts = (search) => {
    return dispatch => {
        return apiCall('post', `/api/posts/search`, {...search})
        .then(res => dispatch(loadPosts(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const getPost = (post_id) => {
    return dispatch => {
        return apiCall('get', `/api/posts/${post_id}`)
        .then(res => res)
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const postNewPost = post => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('post', `/api/users/${user_id}/posts/`, {...post})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const updatePost = (post, post_id) => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('post', `/api/users/${user_id}/posts/${post_id}`, {...post})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const removePost = (user_id, post_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/posts/${post_id}`)
        .then(() => dispatch(remove(post_id)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const applyToPost = post_id => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('get', `/api/users/${user_id}/posts/${post_id}/apply`)
    .then(res => dispatch(addAlert('Successfully applied to post', SUCCESS)))
    .catch(e => dispatch(addAlert(e.message, ERROR)));
}
