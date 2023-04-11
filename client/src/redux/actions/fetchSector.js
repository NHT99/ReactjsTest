
import { FETCH_SECTOR_REQUEST, FETCH_SECTOR_SUCCESS, FETCH_SECTOR_ERROR } from "../constants/Constants";
const API_ADDRESS = "https://sector-app.onrender.com/sector/getAllSector"
export const fetchSector = () =>async (dispatch) => {
    
    try {
        dispatch({
        type: FETCH_SECTOR_REQUEST
        });
    
        const response = await fetch(API_ADDRESS);
        const responseBody = await response.json();
        
        dispatch({
            type: FETCH_SECTOR_SUCCESS,
            sectorData: responseBody[0].sector, 
        })
    } catch (error) {
        dispatch({
            type: FETCH_SECTOR_ERROR,
            message: error
        })
    }
}