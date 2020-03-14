import React, {useContext} from 'react';
import {Grid} from '@material-ui/core';
import AccountDetails from "./components/AccountDetails/AccountDetails";
import withStyles from "@material-ui/core/styles/withStyles";

import AuthContext from "../../../../context/auth/authContext";
import AccountProfile from "./components/AccountProfile/AccountProfile";
//loading
import CustomCircularProgress from "../../../Loading/CircularProgress";

// Component styles
const styles = theme => ({
    root: {
        padding: `${theme.spacing(4)}px ${theme.spacing(4)}px 0`
    }
});

const Account = ({classes}) => {
    const authContext = useContext(AuthContext);

    const {user = {}, loading} = authContext;

    if (loading) {
        return (
            <CustomCircularProgress height={320}/>
        )
    } else {
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

export default withStyles(styles)(Account);