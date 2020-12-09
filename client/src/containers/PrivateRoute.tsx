import React from 'react';
import { useApolloClient } from '@apollo/client';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { MeDocument } from '../generated/graphql';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { me } = useApolloClient().readQuery({ query: MeDocument });
  return (
    <Route
      {...rest}
      render={(props) =>
        me ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
