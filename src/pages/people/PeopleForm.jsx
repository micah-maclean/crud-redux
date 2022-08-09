import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { handleCreatePerson, handleUpdatePerson } from "../../store/actions/PeopleAction";

function PeopleForm({handleCreate, handleUpdate}) {
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        if(id){
            setIsEditing(true);
        }
        
    }, [])
  return (
    <div>
        <h1>{ isEditing ? 'Editar Pessoa' : 'Adicionar Pessoa' }</h1>
        <Formik 
        initialValues={{
            nome: '',
            cpf: '',
            dataNascimento: '',
            email:'',
        }}
        onSubmit={(values, action) => {
            isEditing ? handleUpdate() : handleCreate(values);
            action.resetForm({values: ''});
        }}>
            <Form>
                <label htmlFor='nome'>Nome</label>
                <Field name='nome' placeholder='Nome'/>

                <label htmlFor='cpf'>CPF</label>
                <Field name='cpf' placeholder='CPF'/>

                <label htmlFor='dataNascimento'>Data de Nascimento</label>
                <Field name='dataNascimento' placeholder='Data de Nascimento'/>

                <label htmlFor='email'>Email</label>
                <Field name='email' placeholder='Email'/>

                <button type='submit'>{ isEditing ? 'Editar' : 'Adicionar' }</button>
            </Form>
        </Formik>
    </div>
  )
}

const mapDispatchToProp = dispatch => ({
    handleUpdate: (id, values) => dispatch(handleUpdatePerson(id, values)),
    handleCreate: (values) => dispatch(handleCreatePerson(values))
})

export default connect(mapDispatchToProp)(PeopleForm)