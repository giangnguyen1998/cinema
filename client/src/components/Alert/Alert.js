import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import CustomizedSnackbar from "../CustomizedSnackbar/CustomizedSnackbar";
import AlertContext from "../../context/alert/alertContext";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
    }
});

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {alerts, open, removeAlert} = alertContext;
    const classes = useStyles();

    return (
        alerts.length > 0 && alerts.map((alert, index) => (
            <div key={`custom-alert-${index}-${alert.id}`} className={classes.root}>
                <CustomizedSnackbar
                    isOpen={open}
                    removeAlert={removeAlert}
                    vertical="top"
                    horizontal="right"
                    variant={alert.type}
                    message={alert.msg}
                />
            </div>
        ))
    )
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

Alert.defaultProps = {
    alerts: []
};

export default Alert;