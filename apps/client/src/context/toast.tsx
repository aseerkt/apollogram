import cn from 'classnames'
import { createContext, useCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

type MessageType = (msg: string) => void

const ToastContext = createContext<MessageType>({} as any)

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null)

  const toast = useCallback((msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 5000)
  }, [])

  return (
    <ToastContext.Provider value={toast}>
      <>
        {children}
        {message &&
          createPortal(
            <div
              className={cn(
                'w-screen bg-gray-800 text-white transition-all duration-200',
                {
                  'hidden h-0': !message,
                  'fixed bottom-0 flex h-14 items-center justify-center':
                    message,
                }
              )}
            >
              <div className='container flex items-center justify-between px-3'>
                <p>{message}</p>
                <button onClick={() => setMessage(null)}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>,
            document.body
          )}
      </>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

export default ToastProvider
