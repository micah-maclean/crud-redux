import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

import { handleLogout } from "../../store/actions/AuthAction"

import { Container } from "../container/container";
import { Button } from "../button/Button";
function Header({token, dispatch}) {
    const navigate = useNavigate();
    return (
      <Container justifyContent='space-between' height='64px' padding='8px 24px'>
        <h1>Logo</h1>
        {
            token && 
            <Button onClick={() => handleLogout(dispatch, navigate)}>Logout</Button>
        }
      </Container>
    )
}

const mapStateToProps = state => ({
    token: state.AuthReducer.token
})
export default connect(mapStateToProps)(Header)