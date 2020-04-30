import { apiCall } from '../../services/api';
import { SET_PROFILE, ERROR, SUCCESS } from '../actionTypes';
import { addAlert } from './alerts';

export const loadProfile = profile => ({
    type: SET_PROFILE,
    profile
});

export const getProfile = (user_id) => {
    return dispatch => {
        return apiCall('get', `/api/users/${user_id}/profiles/`)
        .then(res => dispatch(loadProfile(res)))
        .catch(e => addAlert(e.message, ERROR));
    };
};

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
