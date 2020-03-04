import React, {Fragment, useEffect, useContext} from 'react';
import {Box} from '@material-ui/core';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";

import AuthContext from "../../../../context/auth/authContext";

import {
    randomMovie,
    comingSoon,
    nowShowing,
    suggested
} from "../../../data/MovieDataService";

const HomePage = () => {
    const classes = withStyles(styles);
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loadUser} = authContext;

    useEffect(() => {
        if (isAuthenticated === "true") {
            authContext.loadUser();
        }
        //eslint-disable-next-line
    },[]);

    return (
        <Fragment>
            <MovieBanner movie={randomMovie} height="85vh"/>
            <Box height={60}/>
            <MovieCarousel
                carouselClass={classes.carousel}
                title="Suggested for you"
                movies={suggested}
            />
            <MovieCarousel
                carouselClass={classes.carousel}
                title="Now Showing"
                to="/"
                movies={nowShowing}
            />
            <MovieCarousel
                carouselClass={classes.carousel}
                title="Coming Soon"
                to="/"
                movies={comingSoon}
            />
        </Fragment>
    );
};

export default HomePage;