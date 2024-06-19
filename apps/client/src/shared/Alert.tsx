import { PropsWithChildren } from 'react'

interface AlertProps {
  severity?: 'danger' | 'success' | 'info'
}

const Alert: React.FC<PropsWithChildren<AlertProps>> = ({
  children,
  severity = 'success',
}) => {
  const alertColor = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    info: 'bg-blue-300',
  }
  return <div className={`${alertColor[severity]} w-full p-2`}>{children}</div>
}

export default Alert
