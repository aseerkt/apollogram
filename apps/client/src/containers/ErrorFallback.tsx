import { FallbackProps } from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => (
  <div className='flex h-screen w-screen flex-col items-center justify-center text-center'>
    <h1 className='mb-3 text-3xl font-extrabold'>Something went wrong</h1>
    <p>{error.toString()}</p>
  </div>
)

export default ErrorFallback
