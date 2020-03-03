import React, {Fragment, useContext, useEffect} from "react";
import Navbar from "../layouts/Navbar";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthContext from "../../context/auth/authContext";
import Grid from "@material-ui/core/Grid";

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Navbar/>
            <Container maxWidth={"xs"}>
                <CssBaseline/>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <span className={"text-30"}>Home Page</span>
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Home;