import { setToken } from '@/utils/auth'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import AuthFormWrapper from '../containers/FormWrapper'
import { LoginMutationDocument } from '../graphql/mutations'
import { MeQueryDocument } from '../graphql/queries'
import useUserRedirect from '../hooks/useRedirect'
import Button from '../shared/Button'
import InputField from '../shared/InputField'
import { getQueryKey, useGqlMutation } from '../utils/react-query-gql'

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().trim().required('Password is required'),
})

const testLoginCredentials = { username: 'bob', password: 'bob@123' }

const Login: React.FC = () => {
  useUserRedirect('guest')

  const queryClient = useQueryClient()

  const { mutateAsync: login, isPending } = useGqlMutation(
    LoginMutationDocument,
    {
      onSuccess: async (data) => {
        const user = data?.login.user
        const token = data?.login.token
        if (user && token) {
          setToken(token)
          await queryClient.refetchQueries({
            queryKey: getQueryKey(MeQueryDocument),
          })
        }
      },
    }
  )

  const handleTestLogin = () => {
    login(testLoginCredentials)
  }

  return (
    <AuthFormWrapper title='Login'>
      <div className='p-4'>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={async ({ username, password }, { setFieldError }) => {
            try {
              const result = await login({ username, password })
              if (result.login.errors) {
                result.login.errors.forEach(({ path, message }) => {
                  setFieldError(path, message)
                })
                return
              }
            } catch (err) {
              // console.log(err);
            }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className='mb-3'>
              <InputField name='username' label='Username' />
              <InputField name='password' type='password' label='Password' />

              <Button
                isLoading={isSubmitting}
                className='my-3'
                color='dark'
                fullWidth
                type='submit'
                disabled={!isValid}
              >
                Login
              </Button>
              <Button
                isLoading={isPending}
                className='my-3'
                fullWidth
                color='dark'
                type='button'
                onClick={handleTestLogin}
              >
                Login as Guest
              </Button>
            </Form>
          )}
        </Formik>
        <small>
          Don't have an account?{' '}
          <Link to='/register' className='text-blue-500'>
            Sign Up
          </Link>{' '}
        </small>
      </div>
    </AuthFormWrapper>
  )
}

export default Login
