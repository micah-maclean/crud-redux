import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import PeopleReducer from "./PeopleRedurer";

export default combineReducers({AuthReducer, PeopleReducer});