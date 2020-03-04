import React, {Fragment, useEffect} from 'react';
import {Box} from '@material-ui/core';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import styles from './styles';
import withStyles from "@material-ui/core/styles/withStyles";

import {
    randomMovie,
    comingSoon,
    nowShowing,
    suggested
} from "../../../data/MovieDataService";

const Home = () => {
    const classes = withStyles(styles);

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
            {/*{false && (*/}
            {/*    <Grid container style={{height: 500}}>*/}
            {/*        <Grid item xs={7} style={{background: '#131334'}}></Grid>*/}
            {/*        <Grid item xs={5} style={{background: '#010025'}}></Grid>*/}
            {/*    </Grid>*/}
            {/*)}*/}
        </Fragment>
    );
};

export default Home;