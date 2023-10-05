import { createContext, useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import cn from 'classnames';

interface MessageType {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const MessageContext = createContext<MessageType>({} as any);

const MessageProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(null), 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <>
        {children}
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
      </>
    </MessageContext.Provider>
  );
};

export const useMessageCtx = () => useContext(MessageContext);

export default MessageProvider;
