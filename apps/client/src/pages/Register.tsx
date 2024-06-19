import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import AuthFormWrapper from '../containers/FormWrapper'
import { RegisterMutationDocument } from '../graphql/mutations'
import useUserRedirect from '../hooks/useRedirect'
import Button from '../shared/Button'
import InputField from '../shared/InputField'
import { useGqlMutation } from '../utils/react-query-gql'

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username is too short'),
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(6, 'Password too short'),
  password2: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const Register: React.FC = ({}) => {
  useUserRedirect('guest')
  const navigate = useNavigate()

  const { mutateAsync: register } = useGqlMutation(RegisterMutationDocument, {})

  return (
    <AuthFormWrapper title='Register'>
      <div className='p-4'>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            password2: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setFieldError }) => {
            const { email, username, password, password2 } = values
            if (password !== password2) {
              setFieldError('password2', 'Password Mismatch')
              return
            }
            const data = await register({
              email,
              username,
              password,
            })
            const errors = data?.register.errors
            const ok = data?.register.ok
            if (errors) {
              errors.forEach(({ path, message }) => {
                setFieldError(path, message)
              })
            }
            if (ok) {
              navigate('/login')
            }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className='mb-3'>
              <InputField label='Email' name='email' />
              <InputField label='Username' name='username' />
              <InputField label='Password' type='password' name='password' />
              <InputField
                label='Confirm Password'
                type='password'
                name='password2'
              />
              <Button
                className='my-3'
                color='dark'
                fullWidth
                type='submit'
                isLoading={isSubmitting}
                disabled={!isValid}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>

        <small>
          Already an account?{' '}
          <Link to='/login' className='text-blue-500'>
            Log In
          </Link>{' '}
        </small>
      </div>
    </AuthFormWrapper>
  )
}

export default Register
