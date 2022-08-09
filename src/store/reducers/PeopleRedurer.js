import { getPeople } from "../actions/PeopleAction";

const INITIAL_STATE = {
    people: [],
    person: {}
}

function PeopleReducer(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'SET_PEOPLE':
            return {
                people: action.data
            };
        default:
            return state;
    }
}

export default PeopleReducer;