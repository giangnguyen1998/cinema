import React, {Fragment} from "react";
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles'
import {Grid, Typography} from "@material-ui/core";
import Fantasy from './fantasy.png'
import {BrowserRouter, Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles(styles);


export default () => {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <Link to={"#"} style={{ textDecoration: 'none' }}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={Fantasy}
                            title="Title"
                        />
                        <CardContent>
                            <Typography
                                className={classes.h5}
                                gutterBottom
                                variant="h5"
                                component="h2"
                                color="inherit">
                                Movie Name
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </BrowserRouter>
    )
};