import api from '../utils/api';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    UPDATE_PROFILE
}   from './types';

// Get current users profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Create or update a profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {

        const res = await api.post('/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
// ADD Bill

export const addBill = ( formData, history ) => async dispatch => {
    try {

        const res = await api.put('/profile/bill', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Bill Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Delete Bill

export const deleteBill = (id) => async dispatch => {
    try {
        const res = await api.delete(`/profile/bill/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            profile: res.data
        });

        dispatch(setAlert('Bill Removed', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
// Delete Account and Profile

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This cannot be undone')) { 
        try {
            const res = await api.delete('/profile');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your Account Has Been Permanantly Deleted'));

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }   
};