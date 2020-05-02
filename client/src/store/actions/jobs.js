import { apiCall } from '../../services/api';
import { LOAD_JOBS, REMOVE_JOB, ERROR, SUCCESS } from '../actionTypes';
import { addAlert } from './alerts';

export const loadJobs = jobs => ({
    type: LOAD_JOBS,
    jobs
});

export const remove = id => ({
    type: REMOVE_JOB,
    id
});

export const fetchJobs = (search) => {
    return dispatch => {
        return apiCall('post', `/api/jobs/search`, {...search})
        .then(res => dispatch(loadJobs(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const getJob = (job_id) => {
    return dispatch => {
        return apiCall('get', `/api/jobs/${job_id}`)
        .then(res => res)
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const postNewJob = job => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('post', `/api/users/${user_id}/jobs/`, {...job})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const updateJob = (job, job_id) => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('post', `/api/users/${user_id}/jobs/${job_id}`, {...job})
    .then(res => {})
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

export const removeJob = (user_id, job_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}/jobs/${job_id}`)
        .then(() => dispatch(remove(job_id)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

export const applyToJob = job_id => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('get', `/api/users/${user_id}/jobs/${job_id}/apply`)
    .then(res => dispatch(addAlert('Successfully applied to job', SUCCESS)))
    .catch(e => dispatch(addAlert(e.message, ERROR)));
}
