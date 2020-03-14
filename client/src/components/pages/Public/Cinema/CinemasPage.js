import React, {useContext, useEffect} from 'react';
import {withStyles, Grid, Typography, Container} from '@material-ui/core';
import CinemaCard from '../components/CinemaCard/CinemaCard';
//import context
import CinemaContext from "../../../../context/cinema/cinemaContext";
//import static data
import SkeletonCinema from "../skeletons/SkeletonCinema";

const styles = theme => ({
    title: {
        fontSize: '3rem',
        lineHeight: '3rem',
        textAlign: 'center',
        marginTop: theme.spacing(15),
        marginBottom: theme.spacing(3)
    }
});

const CinemasPage = ({classes}) => {
    const cinemaContext = useContext(CinemaContext);

    const {getCinemas, loading, clearCinemas, error, cinemas} = cinemaContext;

    useEffect(() => {
        getCinemas();
        if (error != null) {

        }
        return () => {
            clearCinemas();
        }
        //eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <SkeletonCinema/>
        )
    }
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

export default withStyles(styles)(CinemasPage);
