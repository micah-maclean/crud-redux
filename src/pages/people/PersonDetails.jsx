import { Container } from "../../components/container/container";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPersonById, handleDeleteAddress, handleDeleteContact } from "../../store/actions/PeopleAction";
import { Table } from "../../components/table/Table";
import { Button } from "../../components/button/Button";
import { maskCPF, maskDate, maskTelefone } from "../../utils/Masks";

function PersonDetails({person, dispatch}) {
    const navigate = useNavigate();
    const {idPessoa} = useParams();
    useEffect(() => {
        getPersonById(idPessoa, dispatch)
    }, [])

  return (
    <Container padding='30px' backgroundColor='#F7F8FC' minHeight='calc(100vh - 64px)'>
        <Container flexDirection='column' height={'fit-content'} padding={'24px 16px'} border={'1px solid #DFE0EB'} borderRadius={'8px'} backgroundColor={'white'}>
            <h2>Detalhes da Pessoa</h2>
            <p>Nome: <span>{person.nome}</span></p> 
            <p>Data de Nascimento: <span>{maskDate(person.dataNascimento)}</span></p>
            <p>Email: <span>{person.email}</span></p> 
            <p>CPF: <span>{maskCPF(person.cpf)}</span></p>
            
            <Container justifyContent='space-between'>
                <h3>Endereços</h3>
                <Button onClick={() => navigate(`/${idPessoa}/criar-endereco`)}> + Criar Endereço</Button>
            </Container>
            <Table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Cep</th>
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
                                <td>{address.cep}</td>
                                <td>{address.logradouro}</td>
                                <td>{address.numero}</td>
                                <td>{address.complemento}</td>
                                <td>{address.cidade}</td>
                                <td>{address.estado}</td>
                                <td>{address.pais}</td>
                                <td>
                                    <Container  justifyContent={'space-around'} backgroundColor={'none'}>
                                        <Button border={'none'} backgroundColor={'#FEC400'} color={'white'} onClick={() => navigate(`/${idPessoa}/editar-endereco/${address.idEndereco}`)}>Editar</Button>
                                        <Button border={'none'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => handleDeleteAddress(idPessoa, address.idEndereco, dispatch)}>Deletar</Button>
                                    </Container>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>


            <Container justifyContent='space-between' alignItems='center'>
                <h3>Contatos</h3>
                <Button onClick={() => navigate(`/${idPessoa}/criar-contato`)}> + Criar Contato</Button>
            </Container>

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
                                <td>{maskTelefone(contact.telefone)}</td>
                                <td>{contact.descricao}</td>
                                <td>
                                    <Container  justifyContent={'space-around'} backgroundColor={'none'}>
                                        <Button border={'none'} height={'36px'} backgroundColor={'#FEC400'} color={'white'} onClick={() => navigate(`/${idPessoa}/editar-contato/${contact.idContato}`)}>Editar</Button>
                                        <Button border={'none'} height={'36px'} backgroundColor={'#F12B2C'} color={'white'} onClick={() => handleDeleteContact( idPessoa, contact.idContato, dispatch)}>Deletar</Button>
                                    </Container>
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