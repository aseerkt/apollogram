import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  FormControl,
  FormControlProps,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation } from '../generated/graphql';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const initialFormData = {
    email: '',
    username: '',
    password: '',
    password2: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormData);

  const { email, username, password, password2 } = formData;

  const [register, { loading: registerFetching }] = useRegisterMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<FormControlProps>) => {
    e.preventDefault();
    console.log(username, password);
    setFormErrors(initialFormData);
    if (password !== password2) {
      setFormErrors((prev) => ({ ...prev, password2: 'Password Mismatch' }));
    }
    try {
      const res = await register({ variables: { email, username, password } });
      const errors = res.data?.register.errors;
      if (errors) {
        console.log(errors);
        errors.forEach(({ path, message }) => {
          setFormErrors((prev) => ({ ...prev, [path]: message }));
        });
      }
      if (res.data?.register.ok) {
        history.push('/login');
        setFormData(initialFormData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row className='justify-content-sm-center mt-5'>
      <Col sm={5}>
        <Card className='p-3'>
          <h3 className='text-center my-3'>
            <FontAwesomeIcon className='text-danger' icon={faInstagramSquare} />
            <span className='ml-2 text-primary'>Sign Up</span>
          </h3>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type='email'
                name='email'
                isInvalid={!!formErrors.email}
                placeholder='Email Address'
                defaultValue={email}
                onChange={onChange}
              />
              <Form.Text className='text-danger'>{formErrors.email}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                placeholder='Username'
                name='username'
                isInvalid={!!formErrors.username}
                defaultValue={username}
                onChange={onChange}
              />
              <Form.Text className='text-danger'>
                {formErrors.username}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                name='password'
                isInvalid={!!formErrors.password}
                placeholder='Password'
                defaultValue={password}
                onChange={onChange}
              />
              <Form.Text className='text-danger'>
                {formErrors.password}
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type='password'
                name='password2'
                isInvalid={!!formErrors.password2}
                placeholder='Confirm Password'
                defaultValue={password2}
                onChange={onChange}
              />
              <Form.Text className='text-danger'>
                {formErrors.password2}
              </Form.Text>
            </Form.Group>
            <Button
              className='mt-4 mb-3'
              style={{ fontFamily: 'inherit' }}
              block
              type='submit'
              disabled={
                !username ||
                !password ||
                !email ||
                !password2 ||
                registerFetching
              }
            >
              SIGN UP
            </Button>
            <small>
              Already have an account? <Link to='/login'>Login</Link>
            </small>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
