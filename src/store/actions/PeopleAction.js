import { apiDBC } from "../../api";


export async function getPeople(){
    try {
        const {data} = await apiDBC.get('/pessoa/lista-completa');
        return{
            type: 'SET_PEOPLE',
            data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getPersonById(id){
    try {
        await apiDBC.delete(`/pessoa/${id}`);
        getPeople();
    } catch (error) {
        console.log(error);
    }
}

export async function handleCreatePerson(values){
    try {
        await apiDBC.post('/pessoa', values);
        alert('Pessoa cadastrada com sucesso');
        getPeople();
    } catch (error) {
        console.log(error);
    }
}

export async function handleUpdatePerson(id, values){
    try {
        await apiDBC.put(`/pessoa/${id}`, values);
        alert('Pessoa editada com sucesso');
        getPeople();
    } catch (error) {
        console.log(error);
    }
}

export async function handleDeletePerson(id){
    try {
        await apiDBC.delete(`/pessoa/${id}`);
        getPeople();
    } catch (error) {
        console.log(error);
    }
}