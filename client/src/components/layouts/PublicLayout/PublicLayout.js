import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        color: theme.palette.common.white,
        height: '100%'
    }
}));

const PublicLayout = (props) => {
    const classes = useStyles(props);
    const { children, withFooter = true, withNavbar = true } = props;
    return (
        <div className={classes.root}>
            {withNavbar && <Navbar />}
            {children}
            {withFooter && <Footer />}
        </div>
    );
};

export default PublicLayout;
