import axios from 'axios';
import { CREATE_USER_REQUEST , CREATE_USER_SUCCESS , CREATE_USER_ERROR} from "../constants/Constants";

const API_ADD_USER_ADDRESS = "https://sector-app.onrender.com";
export const addUser = (userInfo) =>  (dispatch) =>{
   
        dispatch({
            type: CREATE_USER_REQUEST
        });
       return new Promise((resolve, reject) =>{
            axios
            .post(API_ADD_USER_ADDRESS + "/userInfo/addUser", userInfo)
            .then(res => {
                dispatch({
                    type: CREATE_USER_SUCCESS,
                    userInfoRes: res.data,
                    status: res.status,
                });
                resolve();
            }).catch((err) => {
                dispatch({
                    type: CREATE_USER_ERROR,
                    message: err.statusText
                })
                reject();
            })      
        }) 
        
   }
