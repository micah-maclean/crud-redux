import { apiDBC } from "../../api";

export async function handleLogin(values, dispatch, navigate) {
    try {
        const {data} = await apiDBC.post('/auth', values);
        localStorage.setItem('token', data);
        apiDBC.defaults.headers.common['Authorization'] = data;
        navigate('/');
        dispatch({
            type: 'SET_TOKEN',
            token: data
        })
    } catch (error) {
        console.log(error);
    }
}

export function handleLogout(dispatch, navigate) {
    localStorage.setItem('token', null);
    delete apiDBC.defaults.headers.common['Authorization'];
    navigate('/login');
    dispatch({
        type: 'DELETE_TOKEN',
    });
}

export async function handleSignup(values, navigate){
    try {
        await apiDBC.post('/auth/create', values);
        alert('Usuário cadastrado com sucesso');
        navigate('/login');
    } catch (error) {
        console.log(error);
    }
}

export function isAuth(dispatch){
    const token = localStorage.getItem('token');

    if(token){
        apiDBC.defaults.headers.common['Authorization'] = token;
        dispatch({
            type: 'SET_TOKEN',
            token: token
        }) 
    } else {
        dispatch({
            type: 'SET_LOADING',
            isLoading: false
        })
    }
}