import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from "./components/Loading/Loading";
import WithLayoutRoute from "./components/routing/WithLayoutRoute";
import PrivateRoute from "./components/routing/PrivateRoute";

import PublicLayout from "./components/layouts/PublicLayout/PublicLayout";

// Register - Login
const SignIn = lazy(() => import((`./components/pages/SignIn`)));
const SignUp = lazy(() => import((`./components/pages/SignUp`)));
const HomePage = lazy(() => import((`./components/pages/Public/Home/HomePage`)));
const MoviePage = lazy(() => import((`./components/pages/Public/Movie/MoviePage`)));

const Routes = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Router>
                <Switch>
                    <Route exact path="/login" component={SignIn} />
                    <Route exact path="/register" component={SignUp} />

                    <WithLayoutRoute
                        exact
                        path="/"
                        layout={PublicLayout}
                        component={HomePage}
                    />

                    <WithLayoutRoute
                        exact
                        path="/movie/:id"
                        layout={PublicLayout}
                        layoutProps={{ withFooter: false }}
                        component={MoviePage}
                    />

                    <Route path="*" component={() => '404 NOT FOUND'} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export default Routes;
