import cn from 'classnames';
import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useMessageCtx } from '../context/MessageContext';

const Message = () => {
  const { message, setMessage } = useMessageCtx();
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(null), 5000);
    }
  }, [message]);
  return (
    <div
      className={cn(
        'transition-all w-screen duration-200 bg-gray-800 text-white',
        {
          'hidden h-0': !message,
          'fixed bottom-0 h-14 flex items-center justify-center': message,
        }
      )}
    >
      <div className='container flex items-center justify-between px-3'>
        <p>{message}</p>
        <button onClick={() => setMessage(null)}>
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Message;
