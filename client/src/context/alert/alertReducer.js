import {
    REMOVE_ALERT,
    SET_ALERT
} from "../Types";

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                open: true,
                alerts: action.payload
            };
        case REMOVE_ALERT:
            return {
                alerts: null,
                open: false
            };
        default:
            return state;
    }
};