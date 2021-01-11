import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { apolloClient } from '..';
import Navbar from '../components/Navbar';
import { MeDocument } from '../generated/graphql';

type PrivateRouteProps = RouteProps & {
  component: React.FC<RouteComponentProps>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { me } = apolloClient.readQuery({ query: MeDocument });
  return (
    <Route
      {...rest}
      render={(props) =>
        me ? (
          <>
            <Navbar />
            <div className='mt-20'>
              <Component {...props} />
            </div>
          </>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
