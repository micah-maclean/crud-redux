import { apiDBC } from "../../api";
import {toast} from "react-toastify";

export async function handleLogin(values, dispatch, navigate, resetForm) {
    try {
        const {data} = await apiDBC.post('/auth', values);
        localStorage.setItem('token', data);
        apiDBC.defaults.headers.common['Authorization'] = data;
        navigate('/');
        resetForm({values:''})
        dispatch({
            type: 'SET_TOKEN',
            token: data
        })
    } catch (error) {
        toast.error(error.message);
    }
}

export function handleLogout(dispatch, navigate) {
    localStorage.removeItem('token');
    delete apiDBC.defaults.headers.common['Authorization'];
    navigate('/login');
    dispatch({
        type: 'DELETE_TOKEN',
    });
}

export async function handleSignup(values, navigate, resetForm){
    try {
        await apiDBC.post('/auth/create', values);
        navigate('/login');
        toast.success('Usuário cadastrado com sucesso');
        resetForm({values:''});
    } catch (error) {
        toast.error(error.message);
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