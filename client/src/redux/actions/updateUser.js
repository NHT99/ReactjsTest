import axios from 'axios';
import { UPDATE_USER_REQUEST , UPDATE_USER_SUCCESS , UPDATE_USER_ERROR} from "../constants/Constants";

const API_ADD_USER_ADDRESS = "https://sector-app.onrender.com";
export const updateUser = (userInfo) => (dispatch) => {
    dispatch({
        type : UPDATE_USER_REQUEST
    });
    return new Promise((resolve, reject) =>{
        axios.put(API_ADD_USER_ADDRESS + "/userInfo/" + userInfo._id, userInfo)
        .then((response) => {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                updUserInfoRes : response.data,
                status: response.status,
            })
            resolve();
        })
        .catch((error) => {
            
            dispatch({
                type: UPDATE_USER_ERROR,
                message: error.statusText,
            })
            reject();
        })
    })
}