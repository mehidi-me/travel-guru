import React, { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import { userContext } from './App';

const PrivateRoute = ({ children, ...rest }) => {
  const userLogged = useContext(userContext)[0]
    return (
      <Route
        {...rest}
        render={({ location }) =>
          userLogged.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;