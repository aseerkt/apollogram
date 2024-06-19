import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App'
import ErrorFallback from './containers/ErrorFallback'
import './index.css'
import reportWebVitals from './reportWebVitals'
import './wdyr'

dayjs.extend(relativeTime)

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('root')!)

root.render(
  <ErrorBoundary fallbackRender={ErrorFallback}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ErrorBoundary>
)

reportWebVitals()
