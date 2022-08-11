import { Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { connect } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/container";
import { CustomForm } from "../../components/customForm/CustomForm";

import { handleLogin } from "../../store/actions/AuthAction";
function Login({token, dispatch}) {
    const navigate= useNavigate();

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[])
    
    return (
        <Container backgroundColor='#363740' height='100vh' justifyContent='center' alignItems='center'>
            
            <Formik
                initialValues={{
                    login: '',
                    senha: ''
                }}
                onSubmit={(values, {resetForm}) => {
                    handleLogin(values, dispatch, navigate, resetForm);
                }}
            >
                <CustomForm width='400px'>
                    <h2>Login</h2>

                    <label htmlFor='login'>Login</label>
                    <Field name='login' placeholder='Login'/>

                    <label htmlFor='senha'>Senha</label>
                    <Field name='senha' placeholder='Senha' type='password'/>   
                    
                    <Button width='100%' type='submit'>Login</Button>

                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                </CustomForm>
            </Formik>
        </Container>
    )
}


const mapStateToProps = state => ({
    token: state.AuthReducer.token
})

export default connect(mapStateToProps)(Login); 