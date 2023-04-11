import { combineReducers } from "redux";
import fetchSectorReducer from "./fetchSector";
import createUserReducer from "./createUser";
import updateUser  from "./updateUser";

const reducers = combineReducers({
    sectors : fetchSectorReducer,
    user: createUserReducer,
    updateUser : updateUser
});
export default (state, action) => reducers(state, action);