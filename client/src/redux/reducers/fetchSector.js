import { FETCH_SECTOR_REQUEST, FETCH_SECTOR_SUCCESS, FETCH_SECTOR_ERROR } from "../constants/Constants";

const initialState = {
    message: null,
    data: null,
    isLoading: false
}

function fetchSectorReducer(state = initialState, payload) {
    switch (payload.type) {
        case FETCH_SECTOR_REQUEST: 
        return {
            ...state,
            
            isLoading : true
        };
        case  FETCH_SECTOR_SUCCESS:
            return {
                ...state,
                data : payload.sectorData,
                isLoading: false,
            };
        case  FETCH_SECTOR_ERROR:
            return {
                ...state,
                message : payload.message,
                isLoading: true
                
            };
        default: 
            return state;
    }
}
export default fetchSectorReducer;