import { Container } from "../../components/container/container";
import { CustomForm } from "../../components/customForm/CustomForm";
import { Button } from "../../components/button/Button"
import { Formik, Field } from "formik";
import * as Yup from 'yup';
import { useParams, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import MaskedInput from "react-text-mask";
import { maskedInputCep } from "../../utils/Masks";
import { getAddressById, handleCreateAddress, handleUpdateAddress, handleViaCep } from "../../store/actions/PeopleAction";
import { useEffect } from "react";
function Address({address, dispatch}) {
    const navigate = useNavigate();
    const {idPessoa, idEndereco} = useParams();

    useEffect(()=>{
        if(idEndereco){
            getAddressById(idEndereco, dispatch)
        } else {
            dispatch({
                type: 'SET_ADDRESS',
                address: {}
            })
        }
    },[])


    function handleCep(e) {
        const value= e.target.value.replace(/\D/g,'');
        console.log(value.length)
        if(value.length === 8){
            console.log('aqui')
          handleViaCep(value, dispatch);
        }   
    }

  return (
    <Container padding='30px' backgroundColor='#F7F8FC' minHeight='calc(100vh - 64px)'>
        <Formik
            initialValues={{
                tipo: address ? address.tipo : '',
                logradouro: address ? address.logradouro : '',
                numero: address ? address.numero : '',
                complemento: address ? address.complemento : '',
                cep: address ? address.cep :'',
                cidade: address ? address.cidade :'',
                estado: address ? address.estado :'',
                pais: address ? address.pais :''
            }}
            validationSchema={ Yup.object().shape({
                tipo: Yup.string()
                    .required('Campo obrigatório'),
                logradouro: Yup.string()
                    .required('Campo obrigatório'),
                cep: Yup.string()
                    .transform(value => value.replace(/\D/g,''))
                    .min(8, 'Cep deve conter 8 digitos')
                    .max(8, 'Cep deve conter 8 digitos')
                    .required('Campo obrigatório'),
                numero: Yup.number()
                    .required('Campo obrigatório'),
                cidade: Yup.string()
                    .required('Campo obrigatório'),
                estado: Yup.string()
                .required('Campo obrigatório'),
                pais: Yup.string()
                .required('Campo obrigatório'),
            })}
            onSubmit={ (values, {resetForm}) => {
                const apiValues = {
                    idPessoa: idPessoa,
                    tipo: values.tipo,
                    logradouro: values.logradouro,
                    numero: values.numero,
                    complemento: values.complemento,
                    cep: values.cep.replace(/\D/g,''),
                    cidade: values.cidade,
                    estado: values.estado,
                    pais: values.pais,
                }
                idEndereco ?  handleUpdateAddress(idEndereco, apiValues, navigate, resetForm) : handleCreateAddress(idPessoa, apiValues, navigate, resetForm);
            }}
            enableReinitialize
        >
            { props => (
                <CustomForm>
                    <h2>{idEndereco ?  'Atualizar Endereço' : 'Criar Endereço'}</h2>

                    <label htmlFor='tipo'>Tipo de Endereço*:</label>
                    <Field name='tipo' as='select'>
                        <option>Escolha o tipo</option>
                        <option value="RESIDENCIAL">Residencial</option>
                        <option value="COMERCIAL">Comercial</option>
                    </Field>
                    { props.touched.tipo && props.errors.tipo && <span>{props.errors.tipo}</span>}

                    <label htmlFor='cep'>CEP*:</label>
                    <MaskedInput
                        mask={maskedInputCep}
                        onChange={handleCep}
                        onBlur={props.handleBlur}
                        value={props.values.cep}
                        name="cep"
                        placeholder='CEP'
                    />
                    { props.touched.cep && props.errors.cep && <span>{props.errors.cep}</span>}

                    <label htmlFor='logradouro'>Logradouro*:</label>
                    <Field name='logradouro' placeholder='Logradouro' />
                    { props.touched.logradouro && props.errors.logradouro && <span>{props.errors.logradouro}</span>}

                    <label htmlFor='numero'>Numero*:</label>
                    <Field name='numero' placeholder='Numero' />
                    { props.touched.numero && props.errors.numero &&  <span>{props.errors.numero}</span>}

                    <label htmlFor='complemento'>Complemento:</label>
                    <Field name='complemento' placeholder='Complemento' />

                    <label htmlFor='cidade'>Cidade*:</label>
                    <Field name='cidade' placeholder='Cidade' />
                    { props.touched.cidade && props.errors.cidade && <span>{props.errors.cidade}</span>}

                    <label htmlFor='estado'>Estado*:</label>
                    <Field name='estado' placeholder='Estado' />
                    { props.touched.estado && props.errors.estado && <span>{props.errors.estado}</span>}

                    <label htmlFor='pais'>Pais*:</label>
                    <Field name='pais' placeholder='Pais' />
                    { props.touched.pais && props.errors.pais && <span>{props.errors.pais}</span>}

                    <Button type='submit'>{idEndereco ? 'Atualizar' : 'Criar' }</Button>
                </CustomForm>
            )}
        </Formik>
    </Container>
  )
}

const mapStateToProps = state =>({
    address: state.PeopleReducer.address
})

export default connect(mapStateToProps)(Address)