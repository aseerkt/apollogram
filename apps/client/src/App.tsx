import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './containers/PrivateRoute'
import { MeDocument, useMeQuery } from './generated/graphql'
import { routes } from './routes'
import Alert from './shared/Alert'
import Spinner from './shared/Spinner'
import { apolloClient } from './utils/apolloClient'

const MessageProvider = lazy(() => import('./context/MessageContext'))

const App: React.FC = () => {
  const { loading, error } = useMeQuery()

  if (loading) {
    return <Spinner />
  } else if (error) {
    apolloClient.writeQuery({ query: MeDocument, data: { me: null } })
    return <Alert severity='danger'>{error.message}</Alert>
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
  )
}

export default App
