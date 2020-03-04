import React, {Fragment, useContext, useEffect} from "react";
import styles from "./styles";
import {Grid, Typography} from "@material-ui/core";
import {NavLink, BrowserRouter as Router} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import classnames from 'classnames'
import Button from "@material-ui/core/Button";
import AuthContext from "../../../../../context/auth/authContext";

const useStyles = makeStyles(styles);

const menus = [{name:"Home",link:"/"}, {name:"Now Showing",link:"/"}, {name:"Coming Soon",link:"/"}, {name:"Cinemas",link:"/"}];
export default function () {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [scrollPos, setScrollPos] = React.useState(window.pageYOffset);
    const anchorRef = React.useRef(null);

    //logout
    const authContext = useContext(AuthContext);
    const {isAuthenticated, logout, login} = authContext;
    const isAuth = (isAuthenticated === "true");

    const onLogout = () => {
        logout();
    };
    //
    React.useEffect(()=>{
        const handleScroll = () => {
            setScrollPos(window.pageYOffset);
        };
        window.addEventListener('scroll',handleScroll);
           return ()=>{
               window.removeEventListener('scroll',handleScroll);
           }
    },[window.pageYOffset]);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    console.log(scrollPos);
    return (
        <Fragment>
            <nav className={classnames({
                [classes.navbar]:true,
                [classes.navbarColor]: scrollPos > 30
            })}>
                <Grid container>
                    <Grid container xs={3} className={classes.containers} alignItems="center">

                        <Typography  variant="h2" className={classes.logo}>
                            Cinema Plus
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} xs={6} justify={"center"} alignItems={"center"}>
                        <Router>
                            {
                                menus.map(items => (
                                    <Grid item>
                                        <NavLink to={items.link} className={classes.navLink}>
                                            {/*<Typography component="h1" variant="h6">*/}
                                                {items.name}
                                            {/*</Typography>*/}
                                        </NavLink>
                                    </Grid>
                                ))
                            }
                        </Router>
                    </Grid>
                    <Grid container xs={3} justify="flex-end"  >
                        <IconButton  ref={anchorRef}
                                     aria-controls={open ? 'menu-list-grow' : undefined}
                                     aria-haspopup="true"
                                     onClick={handleToggle}>
                            <PersonIcon fontSize="large" style={{color:"#fff"}} />
                        </IconButton>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.persionals}>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Change Password</MenuItem>
                                                {!isAuth ? (
                                                    <MenuItem >Login</MenuItem>
                                                ) :
                                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                                }
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Grid>
                </Grid>
            </nav>
        </Fragment>
    )
}