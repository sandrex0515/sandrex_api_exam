import axios from 'axios';
import { ADD_DATA, GET_DATAS, DELETE_DATA, LOADING_DATA } from './types'; 
import {takenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getDatas = () => dispatch => {
    dispatch(loadingData());
    axios
        .get('/api/datas')
        .then( res => 
            dispatch({
                type: GET_DATAS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

};


export const addData = ({case_name, area, isPUI, isPUM, isConfirmed, isDead}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({case_name, area, isPUI, isPUM, isConfirmed, isDead});
    axios
        .post('/api/datas', body, config)
        .then(res => 
            dispatch({
                type: ADD_DATA,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const deleteData = id => (dispatch, getState) => {
    axios.delete(`/api/datas/${id}`, takenConfig(getState))
    .then(res => dispatch({
            type: DELETE_DATA,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
};



export const loadingData = () => {
    return{
        type: LOADING_DATA
    }
}