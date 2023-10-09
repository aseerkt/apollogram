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
    path: '/login',
    isPrivate: false,
    Element: Login,
  },
  {
    path: '/register',
    isPrivate: false,
    Element: Register,
  },
  {
    path: '/',
    isPrivate: true,
    Element: Posts,
  },
  {
    path: '/explore',
    isPrivate: true,
    Element: Explore,
  },
  {
    path: '/edit-profile',
    isPrivate: true,
    Element: EditProfile,
  },
  {
    path: '/p/:postId',
    isPrivate: true,
    Element: SinglePost,
  },
  {
    path: '/u/:username',
    isPrivate: true,
    Element: Profile,
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
              {routes.map(({ path, Element, isPrivate }) => (
                <Route
                  key={path}
                  element={
                    isPrivate ? (
                      <PrivateRoute>
                        <Element />
                      </PrivateRoute>
                    ) : (
                      <Element />
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
