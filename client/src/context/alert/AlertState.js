import React, {useReducer} from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import {
    REMOVE_ALERT,
    SET_ALERT,
} from "../Types";

const init = (initialState) => {
    return {
        open: false
    }
};

const AlertState = (props) => {
    const initialState = {
        alerts: null,
        open: null
    };

    const [state, dispatch] = useReducer(alertReducer, initialState, init);

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