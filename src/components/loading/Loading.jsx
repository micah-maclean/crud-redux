import { Container } from "../container/container";
import { Spinner } from "./Spinner";

function Loading() {
  return (
    <Container width={'100%'} height={'100vh'} alignItems={'center'} >
        <Spinner />   
    </Container>
  )
}

export default Loading;