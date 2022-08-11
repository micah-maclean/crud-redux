import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useEffect } from "react";
import {connect} from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import People from "./pages/people/People";
import PeopleForm from "./pages/people/PeopleForm";



import { isAuth } from "./store/actions/AuthAction";
import Header from "./components/header/Header";
import NotFound from "./pages/notFound/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import { GlobalStyle } from "./GlobalStyle";
import PersonDetails from "./pages/people/PersonDetails";
import Contact from "./pages/contact/Contact";
import Address from "./pages/address/Address";
function Routers({isLoading, token, dispatch}) {
  useEffect(() => {
    isAuth(dispatch)
  }, [])

  if(isLoading){
    return <h1>Loading</h1>
  }

  return (
    <BrowserRouter>
      <GlobalStyle/>
      {
        token &&
        <Header/>
      }
      <ToastContainer />
      <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path="/" element={<People/>}/>
            <Route path="/criar-pessoa" element={<PeopleForm/>}/>
            <Route path="/editar-pessoa/:idPessoa" element={<PeopleForm/>}/>
            <Route path="/detalhe-pessoa/:idPessoa" element={<PersonDetails/>}/>
            <Route path="/:idPessoa/criar-endereco/" element={<Address/>}/>
            <Route path="/:idPessoa/criar-contato/" element={<Contact/>}/>
            <Route path="/:idPessoa/editar-endereco/:idEndereco" element={<Address/>}/>
            <Route path="/:idPessoa/editar-contato/:idContato" element={<Contact/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
    isLoading: state.AuthReducer.isLoading,
    token: state.AuthReducer.token
})


export default connect(mapStateToProps)(Routers)