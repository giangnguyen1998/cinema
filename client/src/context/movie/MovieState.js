import React, {useReducer} from "react";
import MovieContext from "./movieContext";
import movieReducer from "./movieReducer";
import axios from "axios";
import {
    GET_MOVIES,
    GET_DATA_FAIL,
    SET_LOADING,
    GET_MOVIE,
    CLEAR_MOVIES,
    CLEAR_MOVIE
} from "../Types";

const MovieState = (props) => {
    const initialState = {
        loading: false,
        movies: [],
        movie: null,
        error: null
    };

    const [state, dispatch] = useReducer(movieReducer, initialState);

    //Get Movies
    const getMovies = (category) => {
        dispatch({
            type: SET_LOADING
        });

        axios.get(`/api/movies/${category}`)
            .then(res => {
                dispatch({
                    type: GET_MOVIES,
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
    //Get movie by id
    const getMovieById = (movieId) => {
        dispatch({
            type: SET_LOADING
        });

        axios.get(`/api/movies/${movieId}`)
            .then(res => {
                dispatch({
                    type: GET_MOVIE,
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
    //Clear movies
    const clearMovies = () => {
        dispatch({
            type: CLEAR_MOVIES
        });
    };
    //Clear movie
    const clearMovie = () => {
        dispatch({
            type: CLEAR_MOVIE
        })
    };

    return (
        <MovieContext.Provider
            value={{
                movies: state.movies,
                movie: state.movie,
                error: state.error,
                loading: state.loading,
                getMovies,
                getMovieById,
                clearMovies,
                clearMovie
            }}>
            {props.children}
        </MovieContext.Provider>
    )
};

export default MovieState;