import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes';
//import {updateObject} from '../utility';

const initialState = {
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.CREATE_STREAM:
        case actionTypes.FETCH_STREAM:
        case actionTypes.EDIT_STREAM:
        return { ...state, [action.payload.id]: action.payload};
        
        case actionTypes.DELETE_STREAM:
        return _.omit(state, action.payload);
        
        case actionTypes.FETCH_STREAMS:
        return {...state, ..._.mapKeys(action.payload,'id')};
        
        default: return state;
    }
}

export default reducer;