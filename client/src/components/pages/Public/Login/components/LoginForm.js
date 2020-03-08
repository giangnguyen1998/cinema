import React, {useState, useContext, useEffect} from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import {Link as RouterLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AlertContext from "../../../../../context/alert/alertContext";
import AuthContext from "../../../../../context/auth/authContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoginForm = (props) => {
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
        <form className={classes.form} onSubmit={onSubmit}>
            <Typography className={classes.title} variant="h2">
                Sign in
            </Typography>
            <div className={classes.fields}>
                <TextField
                    className={classes.textField}
                    label="Email"
                    name="email"
                    onChange={onChange}
                    type="text"
                    value={email}
                    variant="outlined"
                    required
                    rowsMax={1}
                />
                <TextField
                    className={classes.textField}
                    label="Password"
                    name="password"
                    onChange={onChange}
                    type="password"
                    value={password}
                    variant="outlined"
                    required
                    rowsMax={1}
                    inputProps={{
                        maxLength: 16,
                    }}
                />
            </div>

            <div className={classes.wrapper}>
                <Button
                    className={classes.loginButton}
                    color="primary"
                    type="submit"
                    size="large"
                    disabled={loading}
                    variant="contained">
                    Login now
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Typography className={classes.register} variant="body1">
                Don't have an account?
                <RouterLink className={classes.registerUrl} to="/register">
                    register
                </RouterLink>
            </Typography>
        </form>
    );
};

export default LoginForm;