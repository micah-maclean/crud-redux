const INITIAL_STATE = {
    people: [],
    person: {},
    contact: {},
    address: {}
}

function PeopleReducer(state = INITIAL_STATE, action){
    console.log(action)
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
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.address
            };
        case 'SET_CONTACT':
            return{
                ...state,
                contact: action.contact
            };
        default:
            return state;
    }
    
}

export default PeopleReducer;