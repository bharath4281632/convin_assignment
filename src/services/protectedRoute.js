import React from "react";
import { Route, Redirect } from "react-router-dom";
import { currentUser } from "./authUser";

export default function ProtectedRoute({
  path,
  component: Component,
  render,
  ...rest
}) {
  return (
    <Route
      {...rest}
      path={path}
      render={props => {
        if (!currentUser()) return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}
