import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";

//rest = path ?
//Used by any route that needs to be behind authentication.
function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return authContext.authToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/connexion" />
        );
      }}
    />
  );
}

export default PrivateRoute;
