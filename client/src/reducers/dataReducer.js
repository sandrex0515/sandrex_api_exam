import { ADD_DATA, GET_DATAS, DELETE_DATA, LOADING_DATA } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    datas: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_DATAS:
            return{
                ...state,
                datas: action.payload,
                loading: false
            }
        case DELETE_DATA:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                datas: state.datas.filter(data => data._id !== action.payload)
            }
        case ADD_DATA:
            localStorage.setItem('token', action.payload.token);

            return{
                ...state,
                datas: [action.payload, ...state.datas]
            }
        case LOADING_DATA:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
}