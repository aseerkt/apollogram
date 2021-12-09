import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { MeDocument, useMeQuery } from './generated/graphql';
import Alert from './components-ui/Alert';
import { apolloClient } from './utils/apolloClient';
import Spinner from './components-ui/Spinner';
import PrivateRoute from './containers/PrivateRoute';

// Routes
const Login = lazy(() => import('./routes/Login'));
const Register = lazy(() => import('./routes/Register'));
const Posts = lazy(() => import('./routes/Posts'));
const EditProfile = lazy(() => import('./routes/EditProfile'));
const Profile = lazy(() => import('./routes/Profile'));
const SinglePost = lazy(() => import('./routes/SinglePost'));
const MessageProvider = lazy(() => import('./context/MessageContext'));
const Explore = lazy(() => import('./routes/Explore'));

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
