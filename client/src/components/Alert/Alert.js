import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import CustomizedSnackbar from "../CustomizedSnackbar/CustomizedSnackbar";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
    const alertContext = useContext(AlertContext);
    const {alerts, open, removeAlert} = alertContext;

    return (
        alerts.length > 0 && alerts.map((alert, index) => (
            <CustomizedSnackbar
                key={`custom-alert-${index}-${alert.id}`}
                isOpen={open}
                removeAlert={removeAlert}
                vertical="top"
                horizontal="right"
                variant={alert.type}
                message={alert.msg}
            />
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