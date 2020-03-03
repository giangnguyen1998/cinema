import React, {useReducer} from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import {
    REMOVE_ALERT,
    SET_ALERT,
} from "../Types";

const AlertState = (props) => {
    const initialState = {
        alerts: null,
        open: false
    };

    const [state, dispatch] = useReducer(alertReducer, initialState);

    //Set alert
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: {msg, type}
        });
    };
    //Remove Alert
    const removeAlert = () => {
        dispatch({
            type: REMOVE_ALERT
        });
    };

    return (
        <AlertContext.Provider
            value={{
                alerts: state.alerts,
                open: state.open,
                setAlert,
                removeAlert
            }}>
            {props.children}
        </AlertContext.Provider>
    )
};

export default AlertState;