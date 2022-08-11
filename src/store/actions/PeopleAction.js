import { apiDBC, apiViaCEP } from "../../api";
import { toast } from "react-toastify";

export async function getPeople(dispatch){
    try {
        const {data} = await apiDBC.get('/pessoa/lista-completa');
        dispatch({
            type: 'SET_PEOPLE',
            people: data
        }) 
    } catch (error) {
        toast.error(error.message);
    }
}

export async function getPersonById(idPessoa, dispatch){
    try {
        const {data} = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${idPessoa}`);
        
        dispatch({ 
            type: 'SET_PERSON',
            person: data[0]
        })
    } catch (error) {
        toast.error(error.message);
    }
}

export async function getAddressById(idEndereco, dispatch) {
    try {
        const {data} = await apiDBC.get(`/endereco/${idEndereco}`);
        console.log(data);
        dispatch({
            type: 'SET_ADDRESS',
            address: data
        })
    } catch (error) {
        toast.error(error.message);
    }
}

export async function getContactById(idContato, dispatch) {
    try {
        const {data} = await apiDBC.get(`/contato`);
        console.log(data.filter(contact => contact.idContato == idContato)[0])
        dispatch({
            type: 'SET_CONTACT',
            contact: data.filter(contact => (contact.idContato == idContato))[0]
        })
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleViaCep(value, dispatch) {
    value = value.replace(/\.|\-/g, '')
    
    try {
      const {data} = await apiViaCEP.get(`/${value}/json/`)
      const newData = {
        cep: data.cep,
        logradouro: data.logradouro,
        complemento: data.complemento,
        cidade: data.localidade,
        estado: data.uf
      }
      dispatch({
        type: 'SET_ADDRESS',
        address: newData
      })
    } catch (error) {
      toast.error(error.message);
    }
  }

export async function handleCreatePerson(values, navigate, resetForm){
    try {
        await apiDBC.post('/pessoa', values);
        navigate('/');
        resetForm({values: ''});
        toast.success("Pessoa criada com sucesso");
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleCreateAddress(idPessoa, values, navigate, resetForm){
    try {
        await apiDBC.post(`endereco/{idPessoa}?idPessoa=${idPessoa}`, values);
        navigate(`/detalhe-pessoa/${idPessoa}`);
        resetForm({values: ''});
        toast.success('Endereço criado com sucesso');
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleCreateContact(idPessoa, values, navigate, resetForm){
    try {
        await apiDBC.post(`/contato/${idPessoa}`, values);
        navigate(`/detalhe-pessoa/${idPessoa}`);
        resetForm({values: ''});
        toast.success('Contato criado com sucesso');
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleUpdatePerson(idPessoa, values, navigate, resetForm){
    try {
        await apiDBC.put(`/pessoa/${idPessoa}`, values);
        navigate(`/`);
        resetForm({values: ''});
        toast.success('Pessoa atualizada com sucesso');
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleDeletePerson(idPessoa, dispatch){
    try {
        await apiDBC.delete(`/pessoa/${idPessoa}`);
        toast.success('Pessoa deletada com sucesso');
        getPeople(dispatch)
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleUpdateAddress(idEndereco, values, navigate, resetForm){
    try {
        await apiDBC.put(`/endereco/${idEndereco}`, values);
        navigate(`/detalhe-pessoa/${values.idPessoa}`);
        resetForm({values: ''});
        toast.success('Endereço atualizada com sucesso');
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleDeleteAddress(idPessoa, idEndereco, dispatch){
    try {
        await apiDBC.delete(`/endereco/${idEndereco}`);
        toast.success('Endereço deletado com sucesso');
        getPersonById(idPessoa, dispatch)
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleUpdateContact(idContato, values, navigate, resetForm){
    try {
        await apiDBC.put(`/contato/${idContato}`, values);
        navigate(`/detalhe-pessoa/${values.idPessoa}`);
        resetForm({values: ''});
        toast.success('Contato atualizada com sucesso');
    } catch (error) {
        toast.error(error.message);
    }
}

export async function handleDeleteContact(idPessoa, idContato, dispatch){
    try {
        await apiDBC.delete(`/contato/${idContato}`);
        toast.success('Contato deletado com sucesso');
        getPersonById(idPessoa, dispatch)
    } catch (error) {
        toast.error(error.message);
    }
}