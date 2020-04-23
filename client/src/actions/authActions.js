import axios from 'axios';

import { LOADED_USER,
    LOADING_DATA,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
     } from './types';
import { returnErrors } from './errorActions';

    export const register = ({fname, mname, lname, bdate, gender, mnumber, presentAdd, email, pass}) => dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({fname, mname, lname, bdate, gender, mnumber, presentAdd, email, pass});

        axios.post('/api/users', body, config)
            .then(res => dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
                dispatch({
                    type: REGISTER_FAIL
                });
            })
    }

    export const login = ({email, pass}) => dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, pass});
        axios.post('/api/auth', body, config)
            .then(res => dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
                dispatch({
                    type: LOGIN_FAIL
                });
            })
    }
   export const logout = () => {
        return{
            type: LOGOUT_SUCCESS
        }
    }

    export const loadUser = () => (dispatch, getState) => {
        
        axios.get('/api/auth/user', takenConfig(getState))
            .then(res => dispatch({
                type: LOADED_USER,
                payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                });
            })
    }

    export const takenConfig = () => (dispatch, getState) => {
        dispatch({ type: LOADING_DATA });

        const token = getState().auth.token;

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        if(token){
            config.headers['x-auth-token'] = token;
        }
        
        return config;

    }

