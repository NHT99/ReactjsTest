import { combineReducers } from "redux";
import fetchSectorReducer from "./fetchSector";
import createUserReducer from "./createUser";

const reducers = combineReducers({
    sectors : fetchSectorReducer,
    user: createUserReducer,
});
export default (state, action) => reducers(state, action);