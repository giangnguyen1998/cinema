import React, {Fragment} from 'react';
import {CssBaseline} from '@material-ui/core';
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import styles from "./styles";
import HomePage from "../../pages/HomePage/HomePage";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styles);

export default function (props) {
    const classes = useStyles(props);
    const { children, withFooter = true } = props;
    return(
        <div className={classes.root}>
            <CssBaseline/>
            <Navbar />
            <HomePage/>
            {withFooter && <Footer />}
        </div>
    )
}