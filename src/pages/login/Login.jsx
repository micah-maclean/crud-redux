import { Field, Form, Formik } from "formik";
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";

import { handleLogin } from "../../store/actions/AuthAction";
function Login({dispatch}) {
    const navigate= useNavigate();

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    login: '',
                    senha: ''
                }}
                onSubmit={(values, action) => {
                    handleLogin(values, dispatch, navigate);
                    action.resetForm({values: ''})
                }}
            >
                <Form>
                    <label htmlFor='login'>Login</label>
                    <Field name='login' placeholder='Login'/>

                    <label htmlFor='senha'>Senha</label>
                    <Field name='senha' placeholder='Senha' type='password'/>   
                    
                    <button type='submit'>Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default connect()(Login); 