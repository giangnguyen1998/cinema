import React from 'react';
import useStyles from "./styles";
import {Grid} from '@material-ui/core';
import {IconButton} from '@material-ui/core';
import {ArrowBack as ArrowBackIcon} from '@material-ui/icons';
import LoginForm from './components/LoginForm';

const LoginPage = (props) => {
    const classes = useStyles();

    const handleBack = () => {
        const {history} = props;
        history.goBack();
    };

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container>
                <Grid className={classes.bgWrapper} item lg={5}>
                    <div className={classes.bg}/>
                </Grid>
                <Grid className={classes.content} item lg={7} xs={12}>
                    <div className={classes.contentHeader}>
                        <IconButton
                            className={classes.backButton}
                            onClick={handleBack}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </div>
                    <div className={classes.contentBody}>
                        <LoginForm redirect {...props}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginPage;
