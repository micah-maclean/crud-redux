import { Field, Formik } from "formik"
import * as Yup from "yup";
import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { getPersonById, handleCreatePerson, handleUpdatePerson } from "../../store/actions/PeopleAction";
import { CustomForm } from "../../components/customForm/CustomForm";
import { Container } from "../../components/container/container";
import Loading from "../../components/loading/Loading";
import { Button } from "../../components/button/Button";
import MaskedInput from "react-text-mask";
import { maskCPF, maskDate, maskedInputCPF, maskedInputDate } from "../../utils/Masks";

function PeopleForm({person, dispatch}) {
    const navigate = useNavigate();
    const {idPessoa} = useParams();
    useEffect(() => {
        if(idPessoa){
            getPersonById(idPessoa, dispatch)
        } else{
            dispatch({
                type: 'SET_PERSON',
                person: {}
            })
        }
    }, [])


  return (
    <Container padding='30px' backgroundColor='#F7F8FC' height='calc(100vh - 64px)'>
            <Formik 
                initialValues={{
                    nome: person ? person.nome : '',
                    cpf: person ? maskCPF(person.cpf) : '',
                    dataNascimento: person ? maskDate(person.dataNascimento) : '',
                    email: person ? person.email : '',
                }}
                validationSchema={ Yup.object().shape({
                    nome: Yup.string()
                        .required('Campo obrigatório'),
                    cpf: Yup.string()
                        .transform(value => value.replace(/\D/g,''))
                        .min(11, 'CPF deve conter 11 digitos')
                        .max(11, 'CPF deve conter 11 digitos')
                        .required('Campo obrigatório'),
                    dataNascimento: Yup.string()
                        .required('Campo obrigatório'),
                    email: Yup.string().email()
                        .required('Campo obrigatório'),
                })}
                onSubmit={ (values, {resetForm}) => {
                    const apiValues ={
                        nome: values.nome,
                        cpf: values.cpf.replace(/\D/g,''),
                        dataNascimento: values.dataNascimento.split('/').reverse().join('-'),
                        email: values.email,
                    }

                    idPessoa ? handleUpdatePerson(idPessoa, apiValues, navigate, resetForm) : handleCreatePerson(apiValues, navigate, resetForm);
                }}
                enableReinitialize
            >
                {
                    props => (
                        <CustomForm>
                            <h2>{ idPessoa ? 'Atualizar Pessoa' : 'Adicionar Pessoa' }</h2>

                            <label htmlFor='nome'>Nome*</label>
                            <Field name='nome' placeholder='Nome'/>
                            { props.errors.nome && props.touched.nome && <span>{props.errors.nome}</span>}

                            <label htmlFor='cpf'>CPF*</label>
                            <MaskedInput 
                                mask={maskedInputCPF} 
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.cpf}
                                name='cpf' 
                                placeholder='CPF'
                            />
                            { props.errors.cpf && props.touched.cpf && <span>{props.errors.cpf}</span>}                            

                            <label htmlFor='dataNascimento'>Data de Nascimento*</label>
                            <MaskedInput 
                                mask={maskedInputDate} 
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.dataNascimento}
                                name='dataNascimento' 
                                placeholder='Data de Nascimento'
                            />
                            { props.errors.dataNascimento && props.touched.dataNascimento && <span>{props.errors.dataNascimento}</span>}

                            <label htmlFor='email'>Email*</label>
                            <Field name='email' placeholder='Email'/>
                            { props.errors.email && props.touched.email && <span>{props.errors.email}</span>}

                            <Button type='submit'>{ idPessoa ? 'Atualizar' : 'Adicionar' }</Button>
                        </CustomForm>
                    )
                }
            </Formik>
    </Container>
  )
}

const mapStateToProps = state => ({
    person: state.PeopleReducer.person
})

export default connect(mapStateToProps)(PeopleForm)