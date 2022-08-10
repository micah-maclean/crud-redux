import { combineReducers } from "redux";

import AuthReducer from "./AuthReducer";
import PeopleReducer from "./PeopleReducer";

export default combineReducers({AuthReducer, PeopleReducer});