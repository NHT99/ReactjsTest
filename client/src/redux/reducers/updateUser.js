import { UPDATE_USER_ERROR, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../constants/Constants";

const initialState = {
    message: null,
    userInfo: null,
    isLoading: false,
    updateStatus : null,

}
function updateUser(state = initialState , payload) {
    switch (payload.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state, 
                isLoading:true,
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo : payload.updUserInfoRes,
                updateStatus: payload.status,
            }
        case UPDATE_USER_ERROR:
            return {
                ...state,
                message : payload.message,
                isLoading: false 
            }
        default:
            return state
    }
}
export default updateUser;