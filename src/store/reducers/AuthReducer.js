import { apiDBC } from "../../api";

const INITIAL_STATE = {
    token: `${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
}

function AuthReducer(state = INITIAL_STATE, action) {
    apiDBC.defaults.headers.common['Authorization'] = state.token;
    switch(action.type){
        case 'SET_TOKEN':
            return { token: action.data };
        case 'DELETE_TOKEN':
            return { token: null };
        default:
            return state;
    }
}

export default AuthReducer;