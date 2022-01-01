import Navbar from '@/components/Navbar';
import useRedirect from '@/hooks/useRedirect';

const PrivateRoute: React.FC = ({ children }) => {
  useRedirect('private');

  return (
    <>
      <Navbar />
      <div className='mt-20'>{children}</div>
    </>
  );
};

export default PrivateRoute;
