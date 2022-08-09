import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import People from "./pages/people/People";
import PeopleForm from "./pages/people/PeopleForm";


import {Provider} from "react-redux";
import store from "./store"
function Routers() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
            <Route path="/" element={<People/>}/>
            <Route path="/criar-pessoa" element={<PeopleForm/>}/>
            <Route path="/pessoa/:id" element={<PeopleForm/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </Provider>
        
    </BrowserRouter>
  )
}
export default Routers