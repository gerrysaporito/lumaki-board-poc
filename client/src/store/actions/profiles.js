import { apiCall } from '../../services/api';
import { SET_PROFILE, REMOVE_PROFILE, ERROR, SUCCESS } from '../actionTypes';
import { addAlert } from './alerts';

export const loadProfile = profile => ({
    type: SET_PROFILE,
    profile
});

// export const remove = _id => ({
//     type: REMOVE_PROFILE,
//     _id
// });

// export const fetchProfiles = _id => {
//     return dispatch => {
//         return apiCall('get', `/api/users/${_id}/profiles/`)
//         .then(res => res)
//         .catch(e => addAlert(e.message, ERROR));
//     };
// };

export const getProfile = (user_id) => {
    return dispatch => {
        return apiCall('get', `/api/users/${user_id}/profiles/`)
        .then(res => dispatch(loadProfile(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

// export const postNewProfile = profile => (dispatch, getState) => {
//     let { currentUser } = getState();
//     const _id = currentUser.user._id;
//     return apiCall('post', `/api/users/${_id}/profiles/`, {...profile})
//     .then(res => {})
//     .catch(e => dispatch(addAlert(e.message, ERROR)));
// };

export const updateProfile = (profile) => (dispatch, getState) => {
    let { currentUser } = getState();
    const user_id = currentUser.user._id;
    return apiCall('post', `/api/users/${user_id}/profiles/`, {...profile})
    .then(res => {
        dispatch(loadProfile(res));
        let msg = 'Success! We just updated your profile for you.';
        dispatch(addAlert(msg, SUCCESS));
    })
    .catch(e => dispatch(addAlert(e.message, ERROR)));
};

// export const removeProfile = (user_id, profile_id) => {
//     return dispatch => {
//         return apiCall('delete', `/api/users/${user_id}/profiles/${profile_id}`)
//         .then(() => dispatch(remove(profile_id)))
//         .catch(e => addAlert(e.message, ERROR));
//     };
// };
