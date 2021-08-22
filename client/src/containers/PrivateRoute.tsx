import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useMeQuery } from '@/generated/graphql';
import Spinner from '@/components-ui/Spinner';

type PrivateRouteProps = RouteProps & {
  component: React.FC<RouteComponentProps>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'cache-only' });
  if (loading) {
    return <Spinner />;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        data && data.me ? (
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
