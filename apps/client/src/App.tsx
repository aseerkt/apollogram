import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoute from './containers/PrivateRoute'
import { useMeQuery } from './hooks/useMeQuery'
import { routes } from './routes'
import Alert from './shared/Alert'
import ScrollToTop from './shared/ScrollToTop'
import Spinner from './shared/Spinner'

const ToastProvider = lazy(() => import('./context/toast'))

const App: React.FC = () => {
  const result = useMeQuery()

  const { isFetching, error } = result

  if (isFetching) {
    return <Spinner />
  } else if (error) {
    return <Alert severity='danger'>{error.message}</Alert>
  }

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <ScrollToTop />
        <ToastProvider>
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
        </ToastProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
