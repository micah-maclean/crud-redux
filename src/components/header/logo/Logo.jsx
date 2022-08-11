import { Container } from "../../container/container"
import logo from "../../../assets/logo.png"
function Logo() {
  return (
    <Container gap='20px' alignItems='center' justifyContent='center'>
        <img src={logo} alt="logo" />
        <h2 style={{margin: 0}}>Daskboard Kit</h2>
    </Container>
  )
}
export default Logo