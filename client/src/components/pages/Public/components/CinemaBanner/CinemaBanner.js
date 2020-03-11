import React from 'react';
import {Rating} from '@material-ui/lab';
import {
    Box,
    Typography,
    makeStyles,
    withStyles
} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from '../MovieBanner/styles';
import PropsType from "prop-types";
import "../../../../../assets/scss/model-video.css";

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
    iconFilled: {
        color: '#fff'
    },
    iconEmpty: {
        color: '#fff'
    }
})(Rating);

const CinemaBanner = (props) => {
    const {cinema} = props;
    const classes = useStyles(props);
    if (!cinema) return null;

    return (
        <div className={classes.movieHero}>
            <div className={classes.infoSection}>
                <header className={classes.movieHeader}>
                    <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
                        {parseFloat(cinema.star)} : <StyledRating
                        value={parseFloat(cinema.star)}
                        readOnly
                        size="small"
                        emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    />
                    </Box>
                    <Typography
                        className={classes.movieTitle}
                        variant="h1"
                        color="inherit">
                        {cinema.name}
                    </Typography>
                    <Typography
                        className={classes.descriptionText}
                        variant="body1"
                        color="inherit">
                        Address : {cinema.address}
                    </Typography>
                    {cinema.putIn && (
                        <Typography className={classes.director} variant="h4" color="inherit">
                            Put in : {cinema.putIn}
                        </Typography>
                    )}
                </header>
            </div>
            <div
                className={classes.blurBackground}
                style={{
                    backgroundImage: `url(${cinema.image})`
                }}
            />
        </div>
    );
};

CinemaBanner.propsType = {
    cinema: PropsType.object.isRequired
};

export default CinemaBanner;