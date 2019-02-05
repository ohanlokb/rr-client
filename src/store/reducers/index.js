import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import reducerAuth from './auth';
import reducerStreams from './streams';

const rootReducer = combineReducers({
    auth: reducerAuth,
    form: formReducer,
    streams: reducerStreams
});

export default rootReducer;