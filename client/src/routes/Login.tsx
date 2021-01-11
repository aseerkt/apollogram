import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { apolloClient } from '..';
import FormWrapper from '../containers/FormWrapper';
import Button from '../components-ui/Button';
import InputField from '../components-ui/InputField';
import { MeDocument, useLoginMutation } from '../generated/graphql';
import { FaFacebookSquare } from 'react-icons/fa';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ username: null, password: null });

  const [login] = useLoginMutation({
    variables: { username, password },
    onCompleted: (data) => {
      const user = data?.login.user;
      if (user) {
        apolloClient.writeQuery({
          query: MeDocument,
          data: { me: { ...user } },
        });
        history.push('/posts');
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ username: null, password: null });
    try {
      const { data } = await login();
      if (data?.login.errors) {
        data.login.errors.forEach(({ path, message }) => {
          setErrors((prev) => ({
            ...prev,
            [path]: message,
          }));
        });
      }
      if (data?.login.ok) {
        setUsername('');
        setPassword('');
        history.push('/posts');
      }
      console.log(data);
    } catch (err) {
      console.log(err?.networkError.result);
    }
  };
  // console.log(errors);

  return (
    <FormWrapper title='Login'>
      <div className='p-4'>
        <form onSubmit={onSubmit}>
          <InputField
            error={errors.username}
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            error={errors.password}
            type='password'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className='my-3'
            color='dark'
            fullWidth
            type='submit'
            disabled={!username || !password}
          >
            Login
          </Button>
        </form>
        <a
          href={`${process.env.REACT_APP_EXPRESS_URI!}/auth/facebook`}
          className='block px-3 py-1 my-1 text-center text-white uppercase bg-blue-800 rounded-lg'
        >
          <span className='flex items-center justify-center'>
            <FaFacebookSquare className='mr-2' />
            Login With Facebook
          </span>
        </a>
        <small className='mt-3'>
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
