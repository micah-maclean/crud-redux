import { Navigate, Outlet} from 'react-router-dom';
import { connect } from "react-redux";

function PrivateRoutes({token}) {

    return (
        token ? <Outlet/> : <Navigate to='/login'/>
    )
}

const mapStateToProps = state => ({
    token: state.AuthReducer.token
})

export default connect(mapStateToProps)(PrivateRoutes);