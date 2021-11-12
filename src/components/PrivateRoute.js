import React from "react";
import { Route, Redirect } from "react-router-dom";
import View from "./View";

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const token = localStorage.getItem("token");
  return <Route {...rest} render={() => {
      return token ? <View/> : <Redirect path="/login"/>
  }}/>;
}

export default PrivateRoute;