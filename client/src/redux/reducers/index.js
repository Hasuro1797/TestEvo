import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import feedsReducer from './feedsReducer';

const rootReducers = combineReducers({
    auth: authReducer,
    error: errorReducer,
    feeds: feedsReducer,
})

export default rootReducers;