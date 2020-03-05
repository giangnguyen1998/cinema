import React, {useState, forwardRef} from 'react';
import classnames from 'classnames';
import {Rating} from '@material-ui/lab';
import {
    Box,
    Typography,
    Button,
    makeStyles,
    withStyles
} from '@material-ui/core';
import {textTruncate} from '../../../../../ultils/utils';
import {Link} from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './styles';
import "../../../../../assets/scss/model-video.css";
import ModalVideo from 'react-modal-video';

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
    iconFilled: {
        color: '#fff'
    },
    iconEmpty: {
        color: '#fff'
    }
})(Rating);

const LinkBehavior = forwardRef(((props, ref) => (
    <Link to={`booking/${props.link}`} {...props} {...ref} />
)));

const MovieBanner = (props) => {
    const [open, setOpen] = useState(false);
    const {movie, fullDescription} = props;
    const classes = useStyles(props);
    if (!movie) return null;

    const openModal = () => setOpen(true);

    return (
        <div className={classes.movieHero}>
            <div className={classes.infoSection}>
                <header className={classes.movieHeader}>
                    {fullDescription && (
                        <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
                            {movie.genre.split(',').map((genre, index) => (
                                <Typography
                                    key={`${genre}-${index}`}
                                    className={classes.tag}
                                    variant="body1"
                                    color="inherit">
                                    {genre}
                                </Typography>
                            ))}

                            <StyledRating
                                value={4}
                                readOnly
                                size="small"
                                emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                            />
                        </Box>
                    )}
                    <Typography
                        className={classes.movieTitle}
                        variant="h1"
                        color="inherit">
                        {movie.title}
                    </Typography>
                    <Typography
                        className={classes.descriptionText}
                        variant="body1"
                        color="inherit">
                        {textTruncate(movie.description, 450)}
                    </Typography>
                    <Typography className={classes.director} variant="h4" color="inherit">
                        By: {movie.director}
                    </Typography>
                    <Typography
                        className={classes.duration}
                        variant="body1"
                        color="inherit">
                        {movie.duration} min
                    </Typography>
                    <Typography className={classes.genre} variant="body1" color="inherit">
                        {movie.genre}
                    </Typography>
                    {fullDescription && (
                        <Box style={{marginTop: 20}}>
                            <br/>
                            <ModalVideo channel='youtube' isOpen={open} videoId={movie.videoId}
                                        onClose={() => setOpen(false)}/>
                            <Button variant="outlined" size="small" color="primary" style={{
                                marginRight: 10,
                            }} onClick={openModal}>
                                Watch Trailer
                            </Button>
                            <Button variant="contained" size={"small"} color={"primary"} link={movie._id}
                                    component={LinkBehavior}>
                                Buy Tickets
                            </Button>
                        </Box>
                    )}
                </header>
            </div>
            <div
                className={classes.blurBackground}
                style={{
                    backgroundImage: `url(${movie.image})`
                }}
            />
            <div className={classes.movieActions}>
                {!fullDescription && (
                    <Link to={`movie/${movie._id}`} style={{textDecoration: 'none'}}>
                        <Button className={classnames(classes.button, classes.learnMore)}>
                            Learn More
                            <ArrowRightAlt className={classes.buttonIcon}/>
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MovieBanner;