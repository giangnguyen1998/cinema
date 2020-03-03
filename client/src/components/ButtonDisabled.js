import React from "react";
import Button from "@material-ui/core/Button";

const ButtonDisabled = ({isChecked, classes, title}) => {
    if (isChecked) {
        return (
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                {title}
            </Button>
        )
    }
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled
        >
            {title}
        </Button>
    )
};

export default ButtonDisabled;