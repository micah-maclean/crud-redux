import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { getPersonById, handleCreatePerson, handleUpdatePerson } from "../../store/actions/PeopleAction";
import { CustomForm } from "../../components/customForm/CustomForm";
import { Container } from "../../components/container/container";
import Loading from "../../components/loading/Loading";
import { Button } from "../../components/button/Button";

function PeopleForm({person, dispatch}) {
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        if(id){
            setIsEditing(true);
            getPersonById(id, dispatch)
        }  
    }, [])


  return (
    <Container padding='30px' backgroundColor='#F7F8FC' height='calc(100vh - 64px)'>
            <Formik 
            initialValues={{
                nome: person ? person.nome : '',
                cpf: person ? person.cpf : '',
                dataNascimento: person ? person.dataNascimento : '',
                email: person ? person.email : '',
            }}
            enableReinitialize
            onSubmit={(values, action) => {
                isEditing ? handleUpdatePerson(id, values) : handleCreatePerson(values);
                action.resetForm({values: ''});
            }}>
                <CustomForm>
                    <h1>{ isEditing ? 'Atualizar Pessoa' : 'Adicionar Pessoa' }</h1>

                    <label htmlFor='nome'>Nome*</label>
                    <Field name='nome' placeholder='Nome'/>

                    <label htmlFor='cpf'>CPF*</label>
                    <Field name='cpf' placeholder='CPF'/>

                    <label htmlFor='dataNascimento'>Data de Nascimento*</label>
                    <Field name='dataNascimento' placeholder='Data de Nascimento'/>

                    <label htmlFor='email'>Email*</label>
                    <Field name='email' placeholder='Email'/>

                    <Button type='submit'>{ isEditing ? 'Atualizar' : 'Adicionar' }</Button>
                </CustomForm>
            </Formik>
    </Container>
  )
}

const mapStateToProps = state => ({
    person: state.PeopleReducer.person
})

export default connect(mapStateToProps)(PeopleForm)