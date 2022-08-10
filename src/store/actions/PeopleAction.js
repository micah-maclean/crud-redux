import { apiDBC } from "../../api";


export async function getPeople(dispatch){
    try {
        const {data} = await apiDBC.get('/pessoa/lista-completa');
        dispatch({
            type: 'SET_PEOPLE',
            people: data
        }) 
    } catch (error) {
        console.log(error);
    }
}

export async function getPersonById(id, dispatch){
    try {
        const {data} = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${id}`);
        dispatch({ 
            type: 'SET_PERSON',
            person: data[0]
        })
    } catch (error) {
        console.log(error);
    }
}

export async function handleCreatePerson(values){
    try {
        await apiDBC.post('/pessoa', values);
        alert('Pessoa cadastrada com sucesso');
    } catch (error) {
        console.log(error);
    }
}

export async function handleUpdatePerson(id, values){
    try {
        await apiDBC.put(`/pessoa/${id}`, values);
        alert('Pessoa editada com sucesso');
    } catch (error) {
        console.log(error);
    }
}

export async function handleDeletePerson(id){
    try {
        await apiDBC.delete(`/pessoa/${id}`);
    } catch (error) {
        console.log(error);
    }
}