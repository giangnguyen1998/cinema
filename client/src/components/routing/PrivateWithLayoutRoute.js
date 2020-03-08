import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateWithLayoutRoute = (props) => {
    const { layout: Layout, component: Component, layoutProps, ...rest } = props;

    const authContext = useContext(AuthContext);
    const {isAuthenticated, loading} = authContext;
    const isAuth = (isAuthenticated === "true");

    return (
        <Route {...rest} render={matchProps => !isAuth && !loading ? (
            <Redirect to={"/login"} />
        ) : (
            <Layout {...layoutProps}>
                <Component {...matchProps} />
            </Layout>
        )} />
    );
};

export default PrivateWithLayoutRoute;