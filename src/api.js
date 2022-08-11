import axios from "axios";

export const apiDBC = axios.create({
    baseURL: 'https://dbc-pessoa-api.herokuapp.com'
})

export const apiViaCEP = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})