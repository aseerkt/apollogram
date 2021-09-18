interface AlertProps {
  severity?: 'danger' | 'success' | 'info';
}

const Alert: React.FC<AlertProps> = ({ children, severity = 'success' }) => {
  const alertColor = {
    success: 'bg-green-500',
    danger: 'bg-red-500',
    info: 'bg-blue-300',
  };
  return <div className={`${alertColor[severity]} p-2 w-full`}>{children}</div>;
};

export default Alert;
