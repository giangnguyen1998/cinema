import React, {useReducer} from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import {v4 as uuidV4} from "uuid";
import {
    REMOVE_ALERT,
    SET_ALERT,
} from "../Types";

const init = (initialState) => {
    return {
        alerts: [],
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
    const setAlert = (error, type) => {
        let results = [];
        if (error instanceof Array) {
            error.forEach(item => {
                const id = uuidV4();
                const msg = item.msg;
                results.push({msg, type, id});
            });
        } else {
            const id = uuidV4();
            results.push({msg: error, type, id});
        }
        dispatch({
            type: SET_ALERT,
            payload: results
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