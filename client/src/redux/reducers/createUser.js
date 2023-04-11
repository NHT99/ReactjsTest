import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR } from "../constants/Constants";

const initialState = {
    message: null,
    userInfo: null,
    isLoading: false,
    createStatus : null,
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
                userInfo : payload.userInfoRes,
                createStatus: payload.status,
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