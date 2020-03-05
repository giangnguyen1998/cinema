import React from 'react';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import PropsTypes from "prop-types";
import {
    getMovie
} from "../../../data/MovieDataService";

const MoviePage = (props) => {
    const {match: {params}} = props;
    // componentWillUnmount() {
    //     this.props.onSelectMovie(null);
    // }
    const movie = getMovie(params.id);
    return <>{movie && <MovieBanner movie={movie} fullDescription/>}</>;
};

MoviePage.propsType = {
    match: PropsTypes.any.isRequired
};

export default MoviePage;