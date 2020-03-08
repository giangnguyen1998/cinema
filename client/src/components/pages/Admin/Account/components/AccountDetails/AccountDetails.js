import React, {useState, useContext, useEffect} from 'react';
import classNames from 'classnames';
import {Button, TextField} from '@material-ui/core';
import Portlet from "../../../../../Portlet/Portlet";
import PortletContent from "../../../../../PortletContent/PortletContent";
import PortletFooter from "../../../../../PortletFooter/PortletFooter";
import PortletHeader from "../../../../../PortletHeader/PortletHeader";
import PortletLabel from "../../../../../PortletLabel/PortletLabel";

import AlertContext from "../../../../../../context/alert/alertContext";
import AuthContext from "../../../../../../context/auth/authContext";

// Component styles
import useStyles from "./styles";

const AccountDetails = ({user, className}) => {
    const classes = useStyles();
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {error, msg, clearErrors} = authContext;
    const {setAlert} = alertContext;

    // define state
    const [account, setAccount] = useState({
        _id: "",
        name: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
        const {_id, name, phone} = user;
        setAccount({
            ...account,
            _id,
            name,
            phone
        });

        if (error || msg) {
            if (error) {
                setAlert(error, "error");
            } else {
                setAlert(msg, "success");
            }
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, msg]);

    const onChange = (e) => {
        setAccount({...account, [e.target.name]: e.target.value});
    };

    const onUpdateAccount = () => {
        if (name === "" || phone === "") {
            setAlert("Please do not leave name, phone fields blank", "error");
        } else if (name === user.name && phone === user.phone && password === "") {
            setAlert("Account fields nothing changes? Please enter the field differences.", "warning");
        } else {
            authContext.update(account._id, {
                name: account.name,
                phone: account.phone,
                password: account.password
            });
        }
    };

    const rootClassName = classNames(classes.root, className);

    const {name, phone, password} = account;

    return (
        <Portlet className={rootClassName}>
            <PortletHeader>
                <PortletLabel
                    subtitle="The information can be edited"
                    title="Profile"
                />
            </PortletHeader>
            <PortletContent noPadding>
                <form autoComplete="off" noValidate>
                    <div className={classes.field}>
                        <TextField
                            className={classes.textField}
                            helperText="Please specify the first name"
                            margin="dense"
                            label="Full name"
                            required
                            value={name}
                            name="name"
                            variant="outlined"
                            onChange={onChange}
                            rowsMax={1}
                            inputProps={{
                                maxLength: 40,
                            }}
                        />
                    </div>
                    <div className={classes.field1}>
                        <TextField
                            className={classes.textField}
                            margin="dense"
                            label="Phone"
                            required
                            value={phone}
                            name="phone"
                            variant="outlined"
                            onChange={onChange}
                            rowsMax={1}
                            inputProps={{
                                maxLength: 10,
                                minLength: 10
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            label="Password"
                            margin="dense"
                            type="password"
                            value={password}
                            name="password"
                            variant="outlined"
                            onChange={onChange}
                            rowsMax={1}
                            inputProps={{
                                maxLength: 16,
                                minLength: 6
                            }}
                        />
                    </div>
                </form>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onUpdateAccount}
                    type="submit">
                    Save details
                </Button>
            </PortletFooter>
        </Portlet>
    )
};

export default AccountDetails;
