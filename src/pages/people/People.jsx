import { useEffect } from "react";
import {connect} from "react-redux";
import { useNavigate} from "react-router-dom"
import { Button } from "../../components/button/Button";
import { Container } from "../../components/container/container";
import { Table } from "../../components/table/Table";
import { getPeople, handleDeletePerson } from "../../store/actions/PeopleAction";
import { maskCPF, maskDate } from "../../utils/Masks";

function People({ people, dispatch}) {
  const navigate = useNavigate();

  function setup() {
     getPeople(dispatch)
  }
   
  useEffect(() => (
    setup()
  ), [])

  return (
    <Container padding='30px' backgroundColor='#F7F8FC' minHeight='calc(100vh - 64px)'>
        <Container flexDirection='column' height={'fit-content'} padding={'24px 16px'} border={'1px solid #DFE0EB'} borderRadius={'8px'} backgroundColor={'white'}>
            <Container justifyContent='space-between'>
                <h2>Pessoas</h2>
                <Button onClick={() => navigate('/criar-pessoa')}> + Criar Pessoa</Button>
            </Container>
            { people.length > 0 ?
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Email</th>
                            <th>Data de Nascimento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody> 
                        { 
                            people.map( person =>(
                                <tr key={person.idPessoa}>
                                    <td>{person.nome}</td>
                                    <td>{maskCPF(person.cpf)}</td>
                                    <td>{person.email}</td>
                                    <td>{maskDate(person.dataNascimento)}</td>
                                    <td>
                                        <Container  justifyContent={'space-around'}>
                                            <Button border={'none'} backgroundColor={'#FEC400'} color={'white'} onClick={() => navigate(`/detalhe-pessoa/${person.idPessoa}`)}>Visualizar</Button>
                                            <Button border={'none'} backgroundColor={'#3751FF'} color={'white'} onClick={() => navigate(`/editar-pessoa/${person.idPessoa}`)}>Editar</Button>
                                            <Button border={'none'}  backgroundColor={'#F12B2C'}  color={'white'} onClick={() => handleDeletePerson(person.idPessoa, dispatch)}>Deleta</Button>
                                        </Container>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                :
                <h2>Nenhuma Pessoa Ainda</h2>
            }
        
        </Container>
    </Container>
  )
}

const mapStateToProps = state => ({
  people: state.PeopleReducer.people,
  isLoading: state.AuthReducer.isLoading
})

export default connect(mapStateToProps)(People);