import { Container } from "../../components/container/container";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPersonById } from "../../store/actions/PeopleAction";
import { Table } from "../../components/table/Table";
import Loading from "../../components/loading/Loading";

function PersonDetails({person, dispatch}) {
    const {id} = useParams();
    useEffect(() => {
        getPersonById(id, dispatch)
    }, [])

  return (
    <Container padding='30px' backgroundColor='#F7F8FC' minHeight='calc(100vh - 64px)'>
        <Container flexDirection='column' height={'fit-content'} padding={'24px 16px'} border={'1px solid #DFE0EB'} borderRadius={'8px'} backgroundColor={'white'}>
            <h2>Detalhes da Pessoa</h2>
            <p>Nome: <span>{person.nome}</span></p> 
            <p>Data de Nascimento: <span>{person.dataNascimento}</span></p>
            <p>Email: <span>{person.email}</span></p> 
            <p>CPF: <span>{person.cpf}</span></p>

            <Table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Logradouro</th>
                        <th>Numero</th>
                        <th>Complemento</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Pais</th>
                        <th>Ações</th>
                    </tr>
                </thead> 
                <tbody>
                    { person.enderecos &&
                        person.enderecos.map( address => (
                            <tr key={address.idEndereco}>
                                <td>{address.tipo}</td>
                                <td>{address.logradouro}</td>
                                <td>{address.numero}</td>
                                <td>{address.complemento}</td>
                                <td>{address.cidade}</td>
                                <td>{address.estado}</td>
                                <td>{address.pais}</td>
                                <td>
                                    {/* <Container  justifyContent={'space-around'} backgroundColor={'none'}>
                                    <Button border={'none'} backgroundColor={'#FEC400'} color={'white'} onClick={() => updateAddress(address.idEndereco)}>Editar</Button>
                                    <Button border={'none'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => deleteAddress(address.idEndereco)}>Deletar</Button>
                                    </Container> */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>

            <Table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Telefone</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        person.contatos &&
                        person.contatos.map( contact => (
                            <tr key={contact.idContato}>
                                <td>{contact.tipoContato}</td>
                                <td>{contact.telefone}</td>
                                <td>{contact.descricao}</td>
                                <td>
                                    {/* <Container  justifyContent={'space-around'} backgroundColor={'none'}>
                                    <Button border={'none'} height={'36px'} backgroundColor={'#FEC400'} color={'white'} onClick={() => updateContact(contact.idContato)}>Editar</Button>
                                    <Button border={'none'} height={'36px'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => deleteContact(contact.idContato)}>Deletar</Button>
                                    </Container> */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    </Container>
  )
}

const mapStateToProps = state => ({
    person: state.PeopleReducer.person,
    isLoading: state.AuthReducer.isLoading
})

export default connect(mapStateToProps)(PersonDetails)