import axios from 'axios';
import { CREATE_USER_REQUEST , CREATE_USER_SUCCESS , CREATE_USER_ERROR, FETCH_SECTOR_ERROR} from "../constants/Constants";

const API_ADD_USER_ADDRESS = "https://sector-jsondb.vercel.app/userInfo";
export const addUser = (userInfo) => async (dispatch) =>{
    try{
        dispatch({
            type: CREATE_USER_REQUEST
        });
        await axios
        .post(API_ADD_USER_ADDRESS, userInfo)
        .then(res => {
            
            console.log(res);
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: res.data,
            })
        })
        
    }catch{
        dispatch({
            type: FETCH_SECTOR_ERROR,
        
        })
    }
}