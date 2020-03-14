import React, {useReducer} from "react";
import CinemaContext from "./cinemaContext";
import cinemaReducer from "./cinemaReducer";
import axios from "axios";
import {
    GET_CINEMAS,
    GET_DATA_FAIL,
    SET_LOADING,
    CLEAR_CINEMAS,
    CLEAR_ERRORS
} from "../Types";

const init = (initialState) => {
    return {
        loading: false,
        cinemas: [],
    };
};

const CinemaState = (props) => {
    const initialState = {
        loading: null,
        cinemas: null,
        error: null
    };

    const [state, dispatch] = useReducer(cinemaReducer, initialState, init);

    //Get Cinemas
    const getCinemas = () => {
        dispatch({
            type: SET_LOADING
        });

        axios.get("/api/cinemas")
            .then(res => {
                dispatch({
                    type: GET_CINEMAS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_DATA_FAIL,
                    payload: err.response.data.msg
                });
            });
    };
    //Clear cinemas
    const clearCinemas = () => {
        dispatch({
            type: CLEAR_CINEMAS
        });
    };
    //clear errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    };

    return (
        <CinemaContext.Provider
            value={{
                cinemas: state.cinemas,
                error: state.error,
                loading: state.loading,
                getCinemas,
                clearCinemas,
                clearErrors
            }}>
            {props.children}
        </CinemaContext.Provider>
    )
};

export default CinemaState;