//Task List:
//1. Build a PrivateRoute component that redirects if user is not logged in

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        if (localStorage.getItem("authtoken")) {
            return <Component {...props} />
        } else {
            // alert('Wrong username or password!')
            return <Redirect to="/login" />
        }
    }} />
}

export default PrivateRoute;