import axios from '../../axios-streams';
import * as actionTypes from './actionTypes';

import history from '../../history';

export const deleteStream = (id) => async dispatch => {
    // eslint-disable-next-line
    let response = null;
    try {
        response = await axios.delete(`/streams/${id}`);
        dispatch( {type: actionTypes.DELETE_STREAM, payload: id});
        history.push('/');
    } catch ( error ) {
        console.log('Error',error);
    }
}

export const editStream = (id,formValues) => async dispatch => {
    let response = null;
    try {
        // response = await axios.put(`/streams/${id}`, formValues);
        response = await axios.patch(`/streams/${id}`, formValues);
        dispatch( {type: actionTypes.EDIT_STREAM, payload: response.data});
        history.push('/');
    } catch ( error ) {
        console.log('Error',error);
    }
}

export const fetchStream = (id) => async dispatch => {
    let response = null;
    try {
        response = await axios.get(`/streams/${id}`);
        dispatch( {type: actionTypes.FETCH_STREAM, payload: response.data});
    } catch ( error ) {
        console.log('Error',error);
    }
}

export const fetchStreams = () => async dispatch => {
    let response = null;
    try {
        response = await axios.get('/streams');
        dispatch( {type: actionTypes.FETCH_STREAMS, payload: response.data});
    } catch ( error ) {
        console.log('Error',error);
    }
}

export const createStream = formValues => async (dispatch, getState) => {
    // eslint-disable-next-line
    const {userId} = getState().auth;
    let response = null;
    try {
        response = await axios.post('/streams',{...formValues,userId});
        dispatch( {type: actionTypes.CREATE_STREAM, payload: response.data} );
        history.push('/');
    } catch ( error ) {
        console.log('Error',error);
    }
};
