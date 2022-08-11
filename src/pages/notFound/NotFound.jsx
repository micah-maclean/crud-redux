import { Container } from "../../components/container/container"

function NotFound() {
  return (
    <Container height='calc(100vh - 64px)'flexDirection='column' alignItems='center' justifyContent='center'>
      <h1>404</h1>
      <h2>NOT FOUND</h2>
    </Container>
  )
}
export default NotFound