import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import './assets/scss/index.css';

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layouts/Alerts";
import setAuthToken from "./ultils/setAuthToken";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from '@material-ui/core/styles';

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
                <Router>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Alerts/>
                        <Routes/>
                    </ThemeProvider>
                </Router>
            </AlertState>
        </AuthState>
    );
};

export default App;
