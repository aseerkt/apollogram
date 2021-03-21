import React, { useState } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import FormWrapper from '../containers/FormWrapper';
import Button from '../components-ui/Button';
import InputField from '../components-ui/InputField';
import { useRegisterMutation } from '../generated/graphql';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({
    username: null as any,
    password: null as any,
    email: null as any,
    password2: null as any,
  });

  const { email, username, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [register, { loading }] = useRegisterMutation({
    variables: { email, username, password },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      username: null as any,
      password: null as any,
      email: null as any,
      password2: null as any,
    });
    console.log('got here');
    if (password !== password2) {
      setErrors((prev) => ({ ...prev, password2: 'Password Mismatch' }));
      return;
    }
    try {
      const { data, errors } = await register();
      console.log(errors);
      console.log(data);
      if (data?.register.errors) {
        console.log(data.register.errors);
        data.register.errors.forEach(({ path, message }) => {
          setErrors((prev) => ({
            ...prev,
            [path]: message,
          }));
        });
      }
      if (data?.register.ok) {
        history.push('/login');
      }
      console.log(data);
    } catch (err) {
      console.log(err?.networkError.result);
    }
  };
  console.log(errors);

  return (
    <FormWrapper title='Register'>
      <div className='p-4'>
        <form onSubmit={onSubmit}>
          <InputField
            label='Email'
            error={errors.email}
            name='email'
            value={email}
            onChange={onChange}
          />

          <InputField
            label='Username'
            error={errors.username}
            name='username'
            value={username}
            onChange={onChange}
          />

          <InputField
            label='Password'
            error={errors.password}
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
          <InputField
            label='Confirm Password'
            error={errors.password2}
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
          <Button
            className='my-3'
            color='dark'
            fullWidth
            type='submit'
            disabled={!username || !password || !email || !password2 || loading}
          >
            Sign Up
          </Button>
        </form>

        <small className='mt-3'>
          Already an account?{' '}
          <Link to='/login' className='text-blue-500'>
            Log In
          </Link>{' '}
        </small>
      </div>
    </FormWrapper>
  );
};

export default Register;
