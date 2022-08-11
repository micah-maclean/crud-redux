import { useParams, useNavigate } from "react-router-dom";
import {Formik, Field} from "formik";
import * as Yup from "yup";
import MaskedInput from "react-text-mask";
import { useEffect } from "react";
import { connect } from "react-redux";

import { Container } from "../../components/container/container";
import { CustomForm } from "../../components/customForm/CustomForm";
import { Button } from "../../components/button/Button";

import { maskedInputTelefone, maskTelefone } from "../../utils/Masks";
import { getContactById, handleCreateContact, handleUpdateContact } from "../../store/actions/PeopleAction";

function Contact({contact, dispatch}) {
    const navigate = useNavigate();
    const {idPessoa, idContato} = useParams();

    useEffect(() => {
        if(idContato){
            getContactById(idContato, dispatch)
        } else {
            dispatch({
                type: 'SET_CONTACT',
                contact: {}
            })
        }
    }, [])
  return (
    <Container padding='30px' backgroundColor='#F7F8FC' height='calc(100vh - 64px)'>
        <Formik
            initialValues={{
                tipoContato: contact ? contact.tipoContato : '',
                telefone: contact ? maskTelefone(contact.telefone) : '',
                descricao: contact ? contact.descricao : '',
            }}
            validationSchema={ Yup.object().shape({
                telefone: Yup.string()
                    .required('Campo obrigatório'),
                tipoContato: Yup.string()
                    .required('Campo obrigatório'),
                descricao: Yup.string()
                    .required('Campo obrigatório'),
            })}
            onSubmit={ (values, {resetForm}) => {
                const apiValues = {
                    idPessoa: idPessoa,
                    tipoContato: values.tipoContato,
                    telefone: values.telefone.replace(/\D/g,''),
                    descricao: values.descricao
                }
                
                idContato ?  handleUpdateContact(idContato, apiValues, navigate, resetForm) : handleCreateContact(idPessoa, apiValues, navigate, resetForm);
            }}
            enableReinitialize
        >
            { props => (
                <CustomForm>
                    <h2>{idContato ? 'Atualizar Contato' : 'Criar Contato' }</h2>

                    <label htmlFor='tipoContato'> Tipo Contato*:</label>
                    <Field name='tipoContato' as='select'>
                        <option>Escolha o tipo</option>
                        <option value="RESIDENCIAL">Residencial</option>
                        <option value="COMERCIAL">Comercial</option>
                    </Field>
                    { props.touched.tipoContato && props.errors.tipoContato && <span>{props.errors.tipoContato}</span>}

                    <label htmlFor='telefone'>Telefone*:</label>
                    <MaskedInput 
                        mask={maskedInputTelefone} 
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.telefone}
                        name='telefone' 
                        placeholder='Telefone'
                    />
                    { props.touched.telefone && props.errors.telefone && <span>{props.errors.telefone}</span>}

                    <label htmlFor='descricao'>Descrição*:</label>
                    <Field name='descricao' placeholder='Descrição'/>
                    { props.touched.descricao && props.errors.descricao && <span>{props.errors.descricao}</span>}

                    <Button type='submit'>{idContato ? 'Atualizar' : 'Criar'}</Button>
                </CustomForm>
            )}
        </Formik>
    </Container>
  )
}

const mapStateToProps = state => ({
    contact: state.PeopleReducer.contact
})
export default connect(mapStateToProps)(Contact)