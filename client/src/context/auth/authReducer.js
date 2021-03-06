import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS, SET_LOADING,
    UPDATE_SUCCESS,
    UPDATE_FAIL
} from "../Types";

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            localStorage.setItem("isAuthenticated", "true");
            return {
                ...state,
                loading: false,
                isAuthenticated: localStorage.getItem("isAuthenticated"),
                user: action.payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case UPDATE_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("isAuthenticated", "true");
            return {
                ...state,
                ...action.payload,
                msg: action.payload.msg,
                isAuthenticated: localStorage.getItem("isAuthenticated"),
                loading: false
            };
        case UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                loading: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                msg: null,
                error: null
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};