import React from 'react';
import {makeStyles, Grid, Typography, Container} from '@material-ui/core';
import Account from "../../Admin/Account/Account";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '3rem',
        lineHeight: '3rem',
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
        fullWidth: {width: '100%'}
    }
}));

const Dashboard = () => {

    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={2}>
                {/*{!myReservations.length && (*/}
                {/*    <>*/}
                {/*        <Grid item xs={12}>*/}
                {/*            <Typography*/}
                {/*                className={classes.title}*/}
                {/*                variant="h2"*/}
                {/*                color="inherit">*/}
                {/*                My Reservations*/}
                {/*            </Typography>*/}
                {/*        </Grid>*/}
                {/*        <Grid item xs={12}>*/}
                {/*            <MyReservationTable*/}
                {/*                reservations={myReservations}*/}
                {/*                movies={movies}*/}
                {/*                cinemas={cinemas}*/}
                {/*            />*/}
                {/*        </Grid>*/}
                {/*    </>*/}
                {/*)}*/}
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h2" color="inherit">
                        My Account
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Account/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;