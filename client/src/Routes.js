import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import Loading from "./components/Loading/Loading";
import WithLayoutRoute from "./components/routing/WithLayoutRoute";
import PrivateWithLayoutRoute from "./components/routing/PrivateWithLayoutRoute";

import PublicLayout from "./components/layouts/PublicLayout/PublicLayout";

// Register - Login
const RegisterPage = lazy(() => import(`./components/pages/Public/Register/RegisterPage`));
const LoginPage = lazy(() => import(`./components/pages/Public/Login/LoginPage`));
const HomePage = lazy(() => import((`./components/pages/Public/Home/HomePage`)));
const MoviePage = lazy(() => import(`./components/pages/Public/Movie/MoviePage`));
const NotFound = lazy(() => import(`./components/pages/Public/NotFound/NotFound`));
const MovieCategoryPage = lazy(() => import(`./components/pages/Public/MovieCategoryPage/MovieCategoryPage`));
const Dashboard = lazy(() => import(`./components/pages/Public/Dashboard/Dashboard`));
const Cinema = lazy(() => import(`./components/pages/Public/Cinema/Cinemas`));

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
                        component={LoginPage}/>

                    <WithLayoutRoute
                        exact
                        path="/register"
                        layout={PublicLayout}
                        layoutProps={{withFooter: false, withNavbar: false}}
                        component={RegisterPage}/>

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
                        exact
                        path="/movies/category/:category"
                        layout={PublicLayout}
                        component={MovieCategoryPage}
                    />

                    <WithLayoutRoute
                        exact
                        path="/cinemas"
                        layoutProps={{withFooter: false}}
                        layout={PublicLayout}
                        component={Cinema}
                    />

                    <PrivateWithLayoutRoute
                        exact
                        path="/myDashboard"
                        layout={PublicLayout}
                        component={Dashboard}
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
