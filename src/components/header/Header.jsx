import {connect} from "react-redux";
import {useNavigate, Link} from "react-router-dom";

import { handleLogout } from "../../store/actions/AuthAction"

import { Container } from "../container/container";
import { Button } from "../button/Button";
import Logo from "./logo/Logo";
function Header({dispatch}) {
    const navigate = useNavigate();
    return (
      <Container justifyContent='space-between'  backgroundColor='#363740' alignItems='center' height='64px' padding='8px 24px'>
        <Link style={{color: '#A4A6B3', textDecoration: 'none'}}to='/'><Logo/></Link>
        <Button onClick={() => handleLogout(dispatch, navigate)}>Logout</Button>
      </Container>
    )
}

export default connect()(Header)