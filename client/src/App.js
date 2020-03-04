import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layouts/Alerts";
import setAuthToken from "./ultils/setAuthToken";
import Home from "./components/pages/Home";
import PrivateRoute from "./components/routing/PrivateRoute";
import HomePage from "./components/pages/HomePage/HomePage";
import MainLayout from "./components/layouts/MainLayout/MainLayout";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <AlertState>
                <Router>
                    <Fragment>
                        <Alerts/>
                        <Switch>
                            <Route exact path={"/"} component={MainLayout} />
                            <Route exact path={"/login"} component={SignIn}/>
                            <Route exact path={"/register"} component={SignUp}/>
                        </Switch>
                    </Fragment>
                </Router>
            </AlertState>
        </AuthState>
    );
};

export default App;
