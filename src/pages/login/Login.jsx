import { Field, Form, Formik } from "formik";
import { connect } from "react-redux"

import { handleLogin } from "../../store/actions/AuthAction";
function Login() {
  return (
    <div>
        <h1>Login</h1>
        <Formik
            initialValues={{
                login: '',
                senha: ''
            }}
            onSubmit={(values, action) => {
                handleLogin(values);
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

const mapDispatchToProps = dispatch => ({
    handleLogin: (values) => dispatch(handleLogin(values))
})
export default connect(mapDispatchToProps)(Login); 