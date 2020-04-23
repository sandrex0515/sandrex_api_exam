import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


export default combineReducers({
    data: dataReducer,
    error: errorReducer,
    auth: authReducer
})