import Typography from "@material-ui/core/Typography";
import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import {BrowserRouter, Link} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MovieItem from "../MovieItem/MovieItem";
import classnames from 'classnames'
import {ArrowBackIos, ArrowForwardIos} from "@material-ui/icons";
import styles from './styles'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styles);
const movies = [1,2,3,4,5,6,7,8];

function NextArrow(props) {
    const { currentSlide, slideCount, onClick } = props;
    const classes = useStyles({ currentSlide, slideCount });
    return (
        <div className={classnames(classes.arrow, 'nextArrow')} onClick={onClick}>
            <ArrowForwardIos color="inherit" fontSize="large" />
        </div>
    );
}

function PrevArrow(props) {
    const { currentSlide, onClick } = props;
    const classes = useStyles({ currentSlide });
    return (
        <div className={classnames(classes.arrow, 'prevArrow')} onClick={onClick}>
            <ArrowBackIos color="inherit" fontSize="large" />
        </div>
    );
}

export default function () {
    const classes = useStyles();
    const settings = {
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };
    return(
        <Fragment >
                <div className={classes.container}>
                    <Typography className={classes.h2} variant="h2" color="inherit">
                        Title
                    </Typography>
                    <BrowserRouter>
                        <Link to="#" style={{ textDecoration: 'none' }}>
                            <Button className={classes.button} color="primary">
                                Explore All
                            </Button>
                        </Link>
                    </BrowserRouter>
                </div>
                <Slider {...settings} >
                    {movies.map(movie => (
                        <MovieItem />
                    ))}
                </Slider>
        </Fragment>
    );
}