import React, {forwardRef, Fragment, useContext} from "react";
import {Link as RouterLink} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from "../../context/auth/authContext";

const LinkBehavior = forwardRef(((props, ref) => (
    <RouterLink to={"/login"} {...props} {...ref} />
)));

const Navbar = () => {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const {isAuthenticated, logout, user} = authContext;
    const isAuth = (isAuthenticated === "true");

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <div className={classes.welcome}>
                Hello {user && user.name}
            </div>
            <ExitToAppIcon/>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Fragment>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    {!isAuth ? (
                        <Button color="inherit" component={LinkBehavior}>Login</Button>
                    ) : authLinks}
                </Toolbar>
            </AppBar>
        </div>
    )
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    welcome: {
        fontSize: '18px',
        marginRight: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default Navbar;