const INITIAL_STATE = {
    people: [],
    person: {}
}

function PeopleReducer(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'SET_PEOPLE':
            return {
                ...state,
                people: action.people
            };
        case 'SET_PERSON':
            return {
                ...state,
                person: action.person
            };
        default:
            return state;
    }
}

export default PeopleReducer;