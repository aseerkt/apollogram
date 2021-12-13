import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { MeDocument, useMeQuery } from './generated/graphql';
import Alert from './components-ui/Alert';
import { apolloClient } from './utils/apolloClient';
import Spinner from './components-ui/Spinner';
import PrivateRoute from './containers/PrivateRoute';

// Routes
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Posts = lazy(() => import('./pages/Posts'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Profile = lazy(() => import('./pages/Profile'));
const SinglePost = lazy(() => import('./pages/SinglePost'));
const MessageProvider = lazy(() => import('./context/MessageContext'));
const Explore = lazy(() => import('./pages/Explore'));

const App: React.FC = () => {
  const { loading, error } = useMeQuery();

  if (loading) {
    return <Spinner />;
  } else if (error) {
    apolloClient.writeQuery({ query: MeDocument, data: { me: null } });
    return <Alert severity='danger'>{error.message}</Alert>;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <MessageProvider>
          <div className='pb-10'>
            <Switch>
              <PrivateRoute exact path='/' component={Posts} />
              <PrivateRoute exact path='/explore' component={Explore} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/p/:postId' component={SinglePost} />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute exact path='/u/:username' component={Profile} />
            </Switch>
          </div>
        </MessageProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
