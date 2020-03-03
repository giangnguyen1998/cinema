import React, {useContext} from "react";
import AlertContext from "../../context/alert/alertContext";
import {makeStyles} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const classes = useStyles();

    const {alerts, open, removeAlert} = alertContext;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        removeAlert();
    };

    const vertical = "top";
    const horizontal = "right";

    return (
        alerts != null && (
            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={6000}
                          anchorOrigin={{vertical, horizontal}}
                          onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alerts.type}>
                        {alerts.msg}
                    </Alert>
                </Snackbar>
            </div>
        )
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default Alerts;