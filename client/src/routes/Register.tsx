import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import { Link, RouteComponentProps } from 'react-router-dom';
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

  const [register] = useRegisterMutation({
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
    if (password !== password2) {
      setErrors((prev) => ({ ...prev, password2: 'Password Mismatch' }));
      return;
    }
    try {
      const { data } = await register();
      if (data?.register.errors) {
        data.register.errors.forEach(({ path, message }) => {
          setErrors((prev) => ({
            ...prev,
            [path]: message,
          }));
        });
      }
      if (data?.register.ok) {
        history.push('/');
      }
      console.log(data);
    } catch (err) {
      console.log(err?.networkError.result);
    }
  };
  // console.log(errors);

  return (
    <Row className='justify-content-md-center mt-5'>
      <Col md={6}>
        <Card>
          <Card.Header>
            <Link
              to='/'
              className='d-flex text-decoration-none justify-content-center align-items-center'
            >
              <FaInstagram size='4em' />
              <h1 className='d-inline font-weight-bolder mb-0'>Instagram</h1>
            </Link>
            <h2 className='text-center font-weight-bolder'>Sign Up</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Control
                  className={errors.email && 'is-invalid'}
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={onChange}
                />
                <Form.Text className='text-danger'>{errors.email}</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className={errors.email && 'is-invalid'}
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={onChange}
                />
                <Form.Text className='text-danger'>{errors.username}</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className={errors.password && 'is-invalid'}
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={onChange}
                />
                <Form.Text className='text-danger'>{errors.password}</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className={errors.password2 && 'is-invalid'}
                  type='password'
                  name='password2'
                  placeholder='Confirm Password'
                  value={password2}
                  onChange={onChange}
                />
                <Form.Text className='text-danger'>
                  {errors.password2}
                </Form.Text>
              </Form.Group>
              <Button
                type='submit'
                disabled={!username || !password || !email || !password2}
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <small>
              Already have an account? <Link to='/login'>Login</Link>{' '}
            </small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
