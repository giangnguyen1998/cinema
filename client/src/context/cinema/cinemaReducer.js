import {
    GET_CINEMAS,
    GET_DATA_FAIL,
    CLEAR_CINEMAS,
    SET_LOADING,
    CLEAR_ERRORS
} from "../Types";

export default (state, action) => {
    switch (action.type) {
        case GET_CINEMAS:
            return {
                ...state,
                cinemas: action.payload,
                loading: false
            };
        case GET_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_CINEMAS:
            return {
                ...state,
                cinemas: []
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};