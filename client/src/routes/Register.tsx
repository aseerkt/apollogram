import { Link, RouteComponentProps } from 'react-router-dom';
import { Form, Formik } from 'formik';
import FormWrapper from '../containers/FormWrapper';
import Button from '../components-ui/Button';
import InputField from '../components-ui/InputField';
import { useRegisterMutation } from '../generated/graphql';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [register] = useRegisterMutation();

  return (
    <FormWrapper title='Register'>
      <div className='p-4'>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            password2: '',
          }}
          onSubmit={async (values, { setFieldError }) => {
            const { email, username, password, password2 } = values;
            if (password !== password2) {
              setFieldError('password2', 'Password Mismatch');
              return;
            }
            try {
              const res = await register({
                variables: { email, username, password },
              });
              const errors = res.data?.register.errors;
              const ok = res.data?.register.ok;
              if (errors) {
                errors.forEach(({ path, message }) => {
                  setFieldError(path, message);
                });
              }
              if (ok) {
                history.push('/login');
              }
            } catch (err) {
              console.log(err?.networkError.result);
            }
          }}
        >
          {({
            isSubmitting,
            values: { email, username, password, password2 },
          }) => (
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
                disabled={!username || !password || !email || !password2}
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
    </FormWrapper>
  );
};

export default Register;
