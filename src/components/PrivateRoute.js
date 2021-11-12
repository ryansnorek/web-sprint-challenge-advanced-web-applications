import React from "react";
import { Route } from "react-router-dom";

function PrivateRoute(props) {
  const { component: Component, ...theRest } = props;
  
  // Check if the user is authorized to view the private page

  return (<Component/>);
}

export default PrivateRoute;