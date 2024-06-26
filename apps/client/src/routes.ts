import { lazy } from 'react'

// Routes
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Posts = lazy(() => import('./pages/Posts'))
const EditProfile = lazy(() => import('./pages/EditProfile'))
const Profile = lazy(() => import('./pages/Profile'))
const SinglePost = lazy(() => import('./pages/SinglePost'))
const Explore = lazy(() => import('./pages/Explore'))

export const routes = [
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
]
