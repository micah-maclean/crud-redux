import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { handleSignup } from "../../store/actions/AuthAction";
function Signup() {
    const navigate = useNavigate();

  return (
    <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                login: '',
                senha: ''
            }}
            onSubmit={(values, action) => {
                handleSignup(values, navigate);
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
    handleSignup: (values) => dispatch(handleSignup(values))
})
export default connect(mapDispatchToProps)(Signup); 