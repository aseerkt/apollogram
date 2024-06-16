import cn from 'classnames'
import { useField } from 'formik'

type InterfaceProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
  label: string
  error?: string
  autoFocus?: boolean
  inline?: boolean
  labelClassName?: string
  helperText?: string
}

const InputField: React.FC<InterfaceProps> = ({
  label,
  autoFocus,
  inline,
  labelClassName,
  helperText,
  ref,
  ...props
}) => {
  const [field, { error, touched }] = useField(props)

  return (
    <div
      className={cn('mb-5', {
        'md:grid-cols-2-form gap-10 md:grid': inline,
      })}
    >
      <label
        className={cn('mb-1 inline-block font-bold', labelClassName, {
          'w-full md:text-right': inline,
        })}
        htmlFor={props.name}
      >
        {label}
      </label>
      <div>
        <input
          {...field}
          className={`mb-3 w-full rounded-md border-gray-300 px-2 py-1 ${
            error && touched
              ? 'border-2 border-red-500 bg-red-100'
              : 'border bg-blue-50 focus:border-gray-500'
          }`}
          {...props}
          autoFocus={autoFocus}
          autoComplete=''
        />
        <small className='block leading-4 text-gray-500'>{helperText}</small>
        {touched && error && (
          <small className='my-1 text-red-700'>{error}</small>
        )}
      </div>
    </div>
  )
}

export default InputField
