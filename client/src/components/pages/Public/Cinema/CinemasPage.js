import React from 'react';
import {makeStyles, Grid, Typography, Container} from '@material-ui/core';
import CinemaCard from '../components/CinemaCard/CinemaCard';
//import static data
import {cinemas} from "../../../data/MovieDataService";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: '3rem',
        lineHeight: '3rem',
        textAlign: 'center',
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(3)
    }
}));

const CinemasPage = (props) => {
    const classes = useStyles(props);

    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} style={{marginBottom: 50}}>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h2" color="inherit">
                        Our Cinemas
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    alignItems="center"
                    justify="flex-start"
                    spacing={2}>
                    {cinemas.map(cinema => (
                        <Grid key={cinema._id} item xs={12} md={4} lg={3}>
                            <CinemaCard cinema={cinema}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default CinemasPage;
