import {connect} from "react-redux";
import { useNavigate} from "react-router-dom"
import { getPeople, handleDeletePerson } from "../../store/actions/PeopleAction";

function People({people, deletePerson}) {
  const navigate = useNavigate();

  
  return (
    <div>
      <div>
        <h1>Pessoas</h1>
        <button onClick={() => navigate('/criar-pessoa')}>Criar Pessoa</button>
      </div>
      
      <table style={{width: '100%'}}>
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
              <tr key={person.id}>
                <td>{person.nome}</td>
                <td>{person.cpf}</td>
                <td>{person.email}</td>
                <td>{person.dataNascimento}</td>
                <td>
                  <button onClick={() => deletePerson(person.id)}>Deleta</button>
                  <button onClick={() => navigate(`/pessoa/${person.id}`)}>Editar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  people: state.PeopleReducer.people
})

const mapDispatchToProps = dispatch => ({
  getPeople: () => dispatch(getPeople()),
  deletePerson: (id) => dispatch(handleDeletePerson(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(People);