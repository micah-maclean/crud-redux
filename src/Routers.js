import {BrowserRouter, Routes, Route} from "react-router-dom";

import { useEffect } from "react";
import {connect} from "react-redux";

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
function Routers({isLoading, dispatch}) {
  useEffect(() => {
    isAuth(dispatch)
  }, [])

  if(isLoading){
    return <h1>Loading</h1>
  }

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Header/>
      <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path="/" element={<People/>}/>
            <Route path="/criar-pessoa" element={<PeopleForm/>}/>
            <Route path="/pessoa/:id/editar" element={<PeopleForm/>}/>
            <Route path="/pessoa/:id" element={<PersonDetails/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
    isLoading: state.AuthReducer.isLoading
})


export default connect(mapStateToProps)(Routers)