import { Field, Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";

import { handleSignup } from "../../store/actions/AuthAction";
import { CustomForm } from "../../components/customForm/CustomForm";
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/container";
import { useEffect } from "react";
function Signup({token, dispatch}) {
    const navigate = useNavigate();
    
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
                handleSignup(values, navigate, dispatch, resetForm);
            }}
        >
            <CustomForm width='400px'> 
                <h2>Signup</h2>
                <label htmlFor='login'>Login</label>
                <Field name='login' placeholder='Login'/>

                <label htmlFor='senha'>Senha</label>
                <Field name='senha' placeholder='Senha' type='password'/>   
                
                <Button width='100%' type='submit'>Login</Button>

                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </CustomForm>
        </Formik>
    </Container>
  )
}

const mapStateToProps = state => ({
    token: state.AuthReducer.token
})

export default connect(mapStateToProps)(Signup); 