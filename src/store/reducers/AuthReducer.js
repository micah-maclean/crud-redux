const INITIAL_STATE = {
    token: '',
    isLoading:  true
}

function AuthReducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case 'SET_TOKEN':
            return { 
                token: action.token,
                isLoading: false
             };
        case 'DELETE_TOKEN':
            return { token: null };
        case 'SET_LOADING':
                return { 
                    ...state,
                    isLoading: false
                 };
        default:
            return state;
    }
}

export default AuthReducer;