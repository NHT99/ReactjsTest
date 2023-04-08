import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware} from "redux";
import reducer from "./reducers/index";

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));