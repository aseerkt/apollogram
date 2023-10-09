import { setToken } from '@/utils/auth';
import { FetchResult, useApolloClient } from '@apollo/client';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FormWrapper from '../containers/FormWrapper';
import { LoginMutation, useLoginMutation } from '../generated/graphql';
import useRedirect from '../hooks/useRedirect';
import Button from '../shared/Button';
import InputField from '../shared/InputField';

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().trim().required('Password is required'),
});

const testLoginCredentials = { username: 'bob', password: 'bob123' };

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const [testLoading, setTestLoading] = useState(false);
  const client = useApolloClient();

  useRedirect('guest');

  const invalidateUserInCache = async (result: FetchResult<LoginMutation>) => {
    const user = result.data?.login.user;
    const token = result.data?.login.token;
    if (user && token) {
      setToken(token);
      await client.refetchQueries({
        updateCache(cache) {
          cache.evict({ fieldName: 'me', broadcast: false });
        },
      });
    }
  };

  const handleTestLogin = async () => {
    setTestLoading(true);
    login({
      variables: testLoginCredentials,
    }).then(invalidateUserInCache);
  };

  return (
    <FormWrapper title='Login'>
      <div className='p-4'>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={async ({ username, password }, { setFieldError }) => {
            try {
              const result = await login({
                variables: { username, password },
              });
              if (result.data?.login.errors) {
                result.data.login.errors.forEach(({ path, message }) => {
                  setFieldError(path, message);
                });
                return;
              }
              invalidateUserInCache(result);
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
                isLoading={testLoading}
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
    </FormWrapper>
  );
};

export default Login;
