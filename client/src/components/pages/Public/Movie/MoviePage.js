import React, {useContext, useEffect} from 'react';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import CustomLinearProgress from "../../../Loading/LinearProgress";
import PropsTypes from "prop-types";
import MovieContext from "../../../../context/movie/movieContext";

const MoviePage = (props) => {
    const movieContext = useContext(MovieContext);
    const {getMovieById, clearMovie, movie, loading} = movieContext;
    useEffect(() => {
        getMovieById(props.match.params.id);

        return () => {
            clearMovie();
        }
        //eslint-disable-next-line
    }, [props.match.params.id]);

    return (
        <div style={{overflow: "hidden", height: '100%'}}>
            <CustomLinearProgress loading={loading}/>
            {movie && <MovieBanner movie={movie} fullDescription/>}
        </div>
    )
};

MoviePage.propsType = {
    match: PropsTypes.any.isRequired
};

export default MoviePage;