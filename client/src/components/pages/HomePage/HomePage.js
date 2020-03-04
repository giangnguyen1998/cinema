import MovieList from "./Components/MovieList/MovieList";
import React, {Fragment, useContext, useEffect} from "react";
import MovieBanner from "./Components/MovieBanner/MovieBanner";
import Box from "@material-ui/core/Box";
import AuthContext from "../../../context/auth/authContext";
import {CssBaseline} from "@material-ui/core";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";


export default function () {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <MovieBanner />
            <Box height={60} />
            <MovieList/>
            <MovieList/>
        </Fragment>
    )
}