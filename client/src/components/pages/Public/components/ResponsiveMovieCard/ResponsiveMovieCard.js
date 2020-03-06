import React from 'react';
import PropTypes from 'prop-types';
import {Paper, Typography} from '@material-ui/core';
import useStyles from "./styles";
import {textTruncate} from '../../../../../ultils/utils';
import {Link} from 'react-router-dom';

const MovieCard = ({movie}) => {
    const classes = useStyles();

    return (
        <Link to={`/movie/${movie._id}`} style={{textDecoration: 'none'}}>
            <Paper className={classes.movieCard} elevation={20}>
                <div className={classes.infoSection}>
                    <header className={classes.movieHeader}>
                        <Typography
                            className={classes.movieTitle}
                            variant="h1"
                            color="inherit">
                            {movie.title}
                        </Typography>
                        <Typography
                            className={classes.director}
                            variant="h4"
                            color="inherit">
                            By: {movie.director}
                        </Typography>
                        <Typography
                            className={classes.duration}
                            variant="body1"
                            color="inherit">
                            {movie.duration} min
                        </Typography>
                        <Typography
                            className={classes.genre}
                            variant="body1"
                            color="inherit">
                            {movie.genre}
                        </Typography>
                    </header>

                    <div className={classes.description}>
                        <Typography
                            className={classes.descriptionText}
                            variant="body1"
                            color="inherit">
                            {textTruncate(movie.description, 250)}
                        </Typography>
                    </div>
                </div>
                <div
                    className={classes.blurBackground}
                    style={{
                        backgroundImage: `url(${movie.image})`
                    }}
                />
            </Paper>
        </Link>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieCard;