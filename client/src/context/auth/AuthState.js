import React, {useReducer} from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../ultils/setAuthToken";
import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_SUCCESS,
    UPDATE_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS, SET_LOADING
} from "../Types";

const init = (initialState) => {
    return {
        token: localStorage.getItem("token"),
        isAuthenticated: localStorage.getItem("isAuthenticated"),
        loading: false
    };
};

const AuthState = (props) => {
    const initialState = {
        token: null,
        isAuthenticated: null,
        loading: null,
        user: null,
        msg: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState, init);

    //Load UserModel
    const loadUser = () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        dispatch({
            type: SET_LOADING
        });

        axios.get("/api/auth")
            .then(res => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: AUTH_ERROR,
                    payload: err.response.data.msg
                });
            });
    };

    //Register UserModel
    const register = (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        dispatch({
            type: SET_LOADING
        });
        axios.post("/api/users", formData, config)
            .then(res => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                });

                loadUser();
            })
            .catch(err => {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err.response.data.msg
                });
            });
    };
    //Login UserModel
    const login = (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        dispatch({
            type: SET_LOADING
        });
        axios.post("/api/auth", formData, config)
            .then(res => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                });

                loadUser();
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err.response.data.msg
                });
            });
    };
    //update user
    const update = (_id, formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        dispatch({
            type: SET_LOADING
        });
        axios.put(`/api/users/${_id}`, formData, config)
            .then(res => {
                dispatch({
                    type: UPDATE_SUCCESS,
                    payload: res.data
                });

                loadUser();
            })
            .catch(err => {
                dispatch({
                    type: UPDATE_FAIL,
                    payload: err.response.data.msg
                });
            });
    };
    //Logout
    const logout = () => dispatch({type: LOGOUT});
    //Clear Errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS});

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                msg: state.msg,
                register,
                update,
                loadUser,
                login,
                logout,
                clearErrors
            }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;