import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

export const PrivateRoute = ({path, exact, Component, loggedIn}) => {
    return (
        <Route path={path} exact={exact} render={props => (
            loggedIn ?
            <Component {...props} />
            : <Redirect to="/login/" />
        )} /> 
    );
};
