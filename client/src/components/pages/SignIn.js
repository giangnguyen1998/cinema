import React, {forwardRef, useState, useEffect, useContext} from "react";
import {Link as RouterLink} from "react-router-dom"
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Copyright from "../layouts/Copyright";
import Header from "../layouts/Header";
import ButtonDisabled from "../ButtonDisabled";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress";

const LinkBehavior = forwardRef(((props, ref) => (
    <RouterLink to={"/register"} {...props} {...ref} />
)));

const SignIn = (props) => {
    const classes = useStyles();
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const {email, password} = user;
    const {setAlert} = alertContext;
    const {login, error, clearErrors, isAuthenticated, loading} = authContext;
    const isAuth = (isAuthenticated === "true");

    useEffect(() => {
        if (isAuth) {
            props.history.push("/");
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, "error");
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuth, props.history]);

    const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlert("Please fill in all fields", "error");
        } else {
            login({
                email,
                password
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className={classes.paper}>
                <Header title={"Sign in"} avatar={classes.avatar}/>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={onChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <ButtonDisabled title={"Sign In"} classes={classes} isChecked={true}/>
                    <Grid container justify={"center"} alignItems={"center"}>
                        <Grid item>
                            <Link component={LinkBehavior} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    )
};

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default SignIn;