import React, {forwardRef, useState, useContext, useEffect} from "react";
import {Link as RouterLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Copyright from "../layouts/Copyright";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Header from "../layouts/Header";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonDisabled from "../ButtonDisabled";

const LinkBehavior = forwardRef(((props, ref) => (
    <RouterLink to={"/login"} {...props} {...ref} />
)));

const SignUp = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const classes = useStyles();
    //init state
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isChecked: false
    });

    const {firstName, lastName, email, password, isChecked} = user;
    const {setAlert} = alertContext;
    const {register, error, clearErrors, isAuthenticated, loading} = authContext;
    const isAuth = (isAuthenticated === "true");

    useEffect(() => {
        if (isAuth) {
            props.history.push("/");
        }

        if (error === 'User already exists') {
            setAlert(error, "error");
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuth, props.history]);

    const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        if (firstName === "" || email === "" || password === "" || lastName === "") {
            setAlert("Please do not leave any fields blank", "error");
        } else if (!isChecked) {
            setAlert("Please check to \"I accept to register account.\"", "warning");
        } else {
            register({
                name: lastName,
                email,
                password
            });
        }
    };

    const onChangeCheckBox = (e) => {
        setUser({...user, isChecked: !isChecked});
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className={classes.paper}>
                <Header title={"Sign up"} avatar={classes.avatar}/>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={onChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={lastName}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox name="check" value={isChecked} onChange={onChangeCheckBox}
                                                   color="primary"/>}
                                label="I accept to register account."
                            />
                        </Grid>
                    </Grid>
                    <ButtonDisabled isChecked={isChecked} classes={classes} title={"Sign Up"} />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={LinkBehavior} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default SignUp;