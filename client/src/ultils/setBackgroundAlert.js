const setBackgroundAlert = (type) => {
    switch (type) {
        case "error":
            return {
                backgroundColor: "rgba(255,0,0,0.3)",
                color: "#FFF"
            };
        case "warning":
            return {
                backgroundColor: "rgba(255,165,0,0.3)",
                color: "#FFF"
            };
        case "success":
            return {
                backgroundColor: "rgba(0,255,0,0.3)",
                color: "#FFF"
            };
        default:
            return {
                backgroundColor: "rgba(255,0,0,0.3)",
                color: "#FFF"
            };
    }
};

export default setBackgroundAlert;