import {Button, Checkbox, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AlertContext from "../../../../../context/alert/alertContext";
import AuthContext from "../../../../../context/auth/authContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const RegisterForm = (props) => {
    const {classes} = props;
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    //init state
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        isChecked: false
    });

    const {name, phone, email, password, isChecked} = user;
    const {setAlert} = alertContext;
    const {register, error, clearErrors, isAuthenticated, loading} = authContext;
    const isAuth = (isAuthenticated === "true");

    useEffect(() => {
        if (isAuth) {
            props.history.push("/");
        }

        if (error === 'UserModel already exists') {
            setAlert(error, "error");
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuth, props.history]);

    const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});

    const onChangeCheckBox = (e) => {
        setUser({...user, isChecked: !isChecked});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "" || phone === "") {
            setAlert("Please do not leave any fields blank", "error");
        } else if (!isChecked) {
            setAlert("Please check to \"I accept to register account.\"", "warning");
        } else {
            register({
                name,
                email,
                password,
                phone
            });
        }
    };

    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <Typography className={classes.title} variant="h2">
                Create new account
            </Typography>
            <Typography className={classes.subtitle} variant="body1">
                Use your email to create new account... it's free.
            </Typography>
            <div className={classes.fields}>
                <TextField
                    className={classes.textField}
                    label="Full name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    variant="outlined"
                    required
                    rowsMax={1}
                    inputProps={{
                        maxLength: 30,
                    }}
                />
                <TextField
                    className={classes.textField}
                    label="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    variant="outlined"
                    required
                    rowsMax={1}
                />
                <TextField
                    className={classes.textField}
                    label="Mobile Phone"
                    name="phone"
                    value={phone}
                    variant="outlined"
                    onChange={onChange}
                    required
                    rowsMax={1}
                    inputProps={{
                        maxLength: 10,
                        minLength: 10
                    }}
                />
                <TextField
                    className={classes.textField}
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    variant="outlined"
                    onChange={onChange}
                    required
                    rowsMax={1}
                    inputProps={{
                        maxLength: 16,
                        minLength: 6
                    }}
                />
                <div className={classes.policy}>
                    <Checkbox
                        value={isChecked}
                        onChange={onChangeCheckBox}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="isChecked"
                    />
                    <Typography
                        className={classes.policyText}
                        variant="body1">
                        I have read the &nbsp;
                        <Link className={classes.policyUrl} to="#">
                            Terms and Conditions
                        </Link>
                        .
                    </Typography>
                </div>
            </div>

            <div className={classes.wrapper}>
                <Button
                    className={classes.registerButton}
                    color="primary"
                    disabled={!isChecked || loading}
                    type="submit"
                    size="large"
                    variant="contained">
                    Register now
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

            <Typography className={classes.login} variant="body1">
                Have an account?{' '}
                <Link className={classes.loginUrl} to="/login">
                    Login
                </Link>
            </Typography>
        </form>
    )
};

export default RegisterForm;