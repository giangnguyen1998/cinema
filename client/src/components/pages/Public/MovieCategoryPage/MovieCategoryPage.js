import React, {useEffect, useContext, Fragment} from 'react';
import {makeStyles, Grid, Typography} from '@material-ui/core';
import ResponsiveMovieCard from '../components/ResponsiveMovieCard/ResponsiveMovieCard';
import MovieContext from "../../../../context/movie/movieContext";
import SkeletonMovieCategory from "../skeletons/SkeletonMovieCategory";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '3rem',
        lineHeight: '3rem',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
        fullWidth: {width: '100%'}
    }
}));

function MovieCategoryPage(props) {
    const movieContext = useContext(MovieContext);
    const category = props.match.params.category;

    const classes = useStyles(props);
    const {movies, getMovies, clearMovies, loading} = movieContext;

    useEffect(() => {
        getMovies(category);

        return () => {
            clearMovies();
        }
        //eslint-disable-next-line
    }, [category]);

    return (
        <Grid container>
            {!['nowShowing', 'comingSoon'].includes(category) ? (
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h2" color="inherit">
                        Category Does not exist.
                    </Typography>
                </Grid>
            ) : (
                <>
                    {loading ? (
                        <SkeletonMovieCategory/>
                    ) : (
                        <Fragment>
                            <Grid item xs={12}>
                                <Typography className={classes.title} variant="h2" color="inherit">
                                    {category === "nowShowing" ? "Now Showing" : "Coming Soon"}
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                style={{marginBottom: 50}}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                spacing={2}>
                                {movies.map(movie => (
                                    <Grid key={movie._id} item className={classes.fullWidth}>
                                        <ResponsiveMovieCard movie={movie}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Fragment>
                    )}
                </>
            )}
        </Grid>
    );
}

export default MovieCategoryPage;
