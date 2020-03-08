import React, {useContext, useEffect} from 'react';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import PropsTypes from "prop-types";
import MovieContext from "../../../../context/movie/movieContext";

const MoviePage = (props) => {
    const movieContext = useContext(MovieContext);
    const {getMovieById, clearMovie, movie} = movieContext;
    useEffect(() => {
        getMovieById(props.match.params.id);
        return () => {
            clearMovie();
        }
        //eslint-disable-next-line
    }, [props.match.params.id]);

    return <>{movie && <MovieBanner movie={movie} fullDescription/>}</>;
};

MoviePage.propsType = {
    match: PropsTypes.any.isRequired
};

export default MoviePage;