import axios from '../../axios-streams';
import * as actionTypes from './actionTypes';


export const deleteStream = (id) => async dispatch => {
    // eslint-disable-next-line
    let response = null;
    try {
        response = await axios.delete(`/streams/${id}`);
    } catch ( error ) {
        console.log('Error',error);
    }

    dispatch( {type: actionTypes.DELETE_STREAM, payload: id});
}

export const editStream = (id,formValues) => async dispatch => {
    let response = null;
    try {
        response = await axios.put(`/streams/${id}`, formValues);
    } catch ( error ) {
        console.log('Error',error);
    }

    dispatch( {type: actionTypes.EDIT_STREAM, payload: response.data});
}

export const fetchStream = (id) => async dispatch => {
    let response = null;
    try {
        response = await axios.get(`/streams/${id}`);
    } catch ( error ) {
        console.log('Error',error);
    }

    dispatch( {type: actionTypes.FETCH_STREAM, payload: response.data});
}

export const fetchStreams = () => async dispatch => {
    let response = null;
    try {
        response = await axios.get('/streams');
    } catch ( error ) {
        console.log('Error',error);
    }

    dispatch( {type: actionTypes.FETCH_STREAMS, payload: response.data});
}

export const createStream = formValues => async (dispatch, getState) => {
    // eslint-disable-next-line
    const {userId} = getState().auth;
    let response = null;
    try {
        response = await axios.post('/streams',{...formValues,userId});
    } catch ( error ) {
        console.log('Error',error);
    }

    dispatch( {type: actionTypes.CREATE_STREAM, payload: response.data} );
};
