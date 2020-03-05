import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import Loading from "./components/Loading/Loading";
import WithLayoutRoute from "./components/routing/WithLayoutRoute";
// import PrivateRoute from "./components/routing/PrivateRoute";

import PublicLayout from "./components/layouts/PublicLayout/PublicLayout";

// Register - Login
const SignIn = lazy(() => import((`./components/pages/SignIn`)));
const SignUp = lazy(() => import((`./components/pages/SignUp`)));
const HomePage = lazy(() => import((`./components/pages/Public/Home/HomePage`)));
const MoviePage = lazy(() => import(`./components/pages/Public/Movie/MoviePage`));
const NotFound = lazy(() => import(`./components/pages/Public/NotFound/NotFound`));

const Routes = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Router>
                <Switch>
                    <WithLayoutRoute
                        exact
                        path="/login"
                        layout={PublicLayout}
                        layoutProps={{withFooter: false, withNavbar: false}}
                        component={SignIn}/>

                    <WithLayoutRoute
                        exact
                        path="/register"
                        layout={PublicLayout}
                        layoutProps={{withFooter: false, withNavbar: false}}
                        component={SignUp}/>

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
                        layoutProps={{withFooter: false}}
                        component={MoviePage}
                    />

                    <WithLayoutRoute
                        path="*"
                        layout={PublicLayout}
                        layoutProps={{withFooter: false, withNavbar: false}}
                        component={NotFound}/>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default Routes;
