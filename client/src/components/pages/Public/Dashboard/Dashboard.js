import React from 'react';
import {withStyles, Grid, Typography, Container} from '@material-ui/core';
import Account from "../../Admin/Account/Account";
import MyReservationTable from "./components/MyReservationTable/MyReservationTable";
import {cinemas, movies, myReservations} from "../../../data/MovieDataService";

const styles = theme => ({
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
});

const Dashboard = ({classes}) => {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h2" color="inherit">
                        My Account
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Account/>
                </Grid>
                {!!myReservations.length && (
                    <>
                        <Grid item xs={12}>
                            <Typography
                                className={classes.title}
                                variant="h2"
                                color="inherit">
                                My Reservations
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MyReservationTable
                                reservations={myReservations}
                                movies={movies}
                                cinemas={cinemas}
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default withStyles(styles)(Dashboard);