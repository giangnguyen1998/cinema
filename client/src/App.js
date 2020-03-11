import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import './assets/scss/index.css';

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import MovieState from "./context/movie/MovieState";
import Alert from "./components/Alert/Alert";
import setAuthToken from "./ultils/setAuthToken";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from '@material-ui/core/styles';

import theme from './theme';
import Routes from "./Routes";
import 'typeface-montserrat';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <AlertState>
                <MovieState>
                    <Router>
                        <ThemeProvider theme={theme}>
                            <CssBaseline/>
                            <Alert/>
                            <Routes/>
                        </ThemeProvider>
                    </Router>
                </MovieState>
            </AlertState>
        </AuthState>
    );
};

export default App;
