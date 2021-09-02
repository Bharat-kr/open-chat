import React from 'react';
import { Redirect } from 'react-router';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;

  if (profile) {
    return <Redirect to="/" />;
  }
  return <div {...routeProps}>{children}</div>;
};

export default PublicRoute;
