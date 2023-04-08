import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR } from "../constants/Constants";

const initialState = {
    message: null,
    userInfo: [],
    isLoading: false
}

function createUserReducer(state = initialState, payload) {
    switch (payload.type) {
        case CREATE_USER_REQUEST: 
        return {
            ...state,
            isLoading : true
        };
        case  CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case  CREATE_USER_ERROR:
            return {
                ...state,
                message : payload.message,
                isLoading: false 
            };
        default: 
            return state;
    }
}
export default createUserReducer;