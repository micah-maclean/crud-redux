import { apiDBC } from "../../api";

export async function handleLogin(values) {
    try {
        const {data} = await apiDBC.post('/auth', values)
        localStorage.setItem('token', data);
        apiDBC.defaults.headers.common['Authorization'] = data;
        window.location.href = '/';
        return {
            type: 'SET_TOKEN',
            data
        };
    } catch (error) {
        console.log(error);
    }
}

export function handleLogout() {
    localStorage.setItem('token', null);
    apiDBC.defaults.headers.common['Authorization'] = null;
    window.location.href = '/login';
    return {
        type: 'DELETE_TOKEN',
    };
}

export async function handleSignup(values){
    try {
        await apiDBC.post('/auth/create', values);
        alert('Usuário cadastrado com sucesso');
        window.location.href = '/login';
    } catch (error) {
        console.log(error);
    }
}