import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from '../containers/FormWrapper';
import Button from '../shared/Button';
import InputField from '../shared/InputField';
import { MeDocument, useLoginMutation } from '../generated/graphql';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useRedirect from '../hooks/useRedirect';

const LoginSchema = Yup.object().shape({
  username: Yup.string().trim().required('Username is required'),
  password: Yup.string().trim().required('Password is required'),
});

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const [testLoading, setTestLoading] = useState(false);

  useRedirect('guest');

  return (
    <FormWrapper title='Login'>
      <div className='p-4'>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ username: '', password: '' }}
          onSubmit={async ({ username, password }, { setFieldError }) => {
            try {
              const { data } = await login({
                variables: { username, password },
                update: (cache, result) => {
                  const user = result.data?.login.user;
                  if (user) {
                    cache.writeQuery({ query: MeDocument, data: { me: user } });
                  }
                },
              });
              if (data?.login.errors) {
                data.login.errors.forEach(({ path, message }) => {
                  setFieldError(path, message);
                });
              }
              // console.log(data);
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
                onClick={() => {
                  setTestLoading(true);
                  login({
                    variables: { username: 'bob', password: 'bob123' },
                    update: (cache, result) => {
                      const user = result.data?.login.user;
                      if (user) {
                        cache.writeQuery({
                          query: MeDocument,
                          data: { me: user },
                        });
                      }
                    },
                  });
                }}
              >
                Login as Guest
              </Button>
            </Form>
          )}
        </Formik>
        {/* <a
          href={`${process.env.REACT_APP_EXPRESS_URI!}/auth/facebook`}
          className='block px-3 py-1 my-1 text-center text-white uppercase bg-blue-800 rounded-lg'
        >
          <span className='flex items-center justify-center'>
            <FaFacebookSquare className='mr-2' />
            Login With Facebook
          </span>
        </a> */}
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
