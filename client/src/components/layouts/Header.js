import React, {Fragment} from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const Header = ({title, avatar}) => {
    return (
        <Fragment>
            <Avatar className={avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {title}
            </Typography>
        </Fragment>
    )
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
};

export default Header;