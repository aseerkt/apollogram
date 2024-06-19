import Navbar from '@/components/Navbar'
import useUserRedirect from '@/hooks/useRedirect'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useUserRedirect('private')

  return (
    <>
      <Navbar />
      <div className='mt-20'>{children}</div>
    </>
  )
}

export default PrivateRoute
