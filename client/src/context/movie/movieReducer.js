import {
    GET_MOVIES,
    GET_DATA_FAIL,
    GET_MOVIE,
    CLEAR_MOVIE,
    CLEAR_MOVIES,
    SET_LOADING,
    CLEAR_ERRORS
} from "../Types";

export default (state, action) => {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
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
        case CLEAR_MOVIES:
            return {
                ...state,
                movies: []
            };
        case CLEAR_MOVIE:
            return {
                ...state,
                movie: null
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