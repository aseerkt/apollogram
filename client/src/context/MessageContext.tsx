import { createContext, useContext, useState } from 'react';

interface MessageType {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const MessageContext = createContext<MessageType>({} as any);

const MessageProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageCtx = () => useContext(MessageContext);

export default MessageProvider;
