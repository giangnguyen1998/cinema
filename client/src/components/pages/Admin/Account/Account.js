import React, {useContext, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import AccountDetails from "./components/AccountDetails/AccountDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";

import AuthContext from "../../../../context/auth/authContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountProfile from "./components/AccountProfile/AccountProfile";

// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing(4)
    }
});

const Account = () => {
    const authContext = useContext(AuthContext);
    const classes = makeStyles(styles);

    const {loadUser, isAuthenticated, loading} = authContext;

    useEffect(() => {
        if (isAuthenticated === "true") {
            loadUser();
        }
        //eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <Grid container justify={"center"} alignItems={"flex-start"} style={{height: 400}}>
                <CircularProgress/>
            </Grid>
        )
    } else {
        const {user = {}} = authContext;
        return (
            <div className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item lg={4} md={6} xl={4} xs={12}>
                        <AccountProfile
                            user={user}
                        />
                    </Grid>
                    <Grid item lg={8} md={6} xl={8} xs={12}>
                        <AccountDetails user={user}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default Account;