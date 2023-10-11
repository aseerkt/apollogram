import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MeDocument, useMeQuery } from './generated/graphql';
import Alert from './shared/Alert';
import { apolloClient } from './utils/apolloClient';
import Spinner from './shared/Spinner';
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

const routes = [
  {
    path: '/',
    isPrivate: true,
    Component: Posts,
  },
  {
    path: '/login',
    isPrivate: false,
    Component: Login,
  },
  {
    path: '/register',
    isPrivate: false,
    Component: Register,
  },
  {
    path: '/explore',
    isPrivate: true,
    Component: Explore,
  },
  {
    path: '/edit-profile',
    isPrivate: true,
    Component: EditProfile,
  },
  {
    path: '/p/:postId',
    isPrivate: true,
    Component: SinglePost,
  },
  {
    path: '/u/:username',
    isPrivate: true,
    Component: Profile,
  },
];

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
            <Routes>
              {routes.map(({ path, Component, isPrivate }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isPrivate ? (
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    ) : (
                      <Component />
                    )
                  }
                />
              ))}
            </Routes>
          </div>
        </MessageProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
