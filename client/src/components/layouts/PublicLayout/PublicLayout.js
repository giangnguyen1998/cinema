import React, {useEffect, useContext} from 'react';
import {withStyles} from '@material-ui/core';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AuthContext from "../../../context/auth/authContext";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        color: theme.palette.common.white,
        height: '100%',
    }
});

const PublicLayout = (props) => {
    const {children, withFooter = true, withNavbar = true, classes} = props;
    //define context
    const authContext = useContext(AuthContext);
    const {isAuthenticated, loadUser} = authContext;

    useEffect(() => {
        if (isAuthenticated === "true") {
            loadUser();
        }
        //eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
            {withNavbar && <Navbar/>}
            {children}
            {withFooter && <Footer/>}
        </div>
    );
};

export default withStyles(styles)(PublicLayout);
