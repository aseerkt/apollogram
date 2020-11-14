import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { useLoginMutation } from '../generated/graphql';
import { Link, RouteComponentProps } from 'react-router-dom';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const initialFormData = { username: '', password: '' };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [formErrors, setFormErrors] = useState(initialFormData);

  const [login] = useLoginMutation({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(initialFormData);
    try {
      const res = await login({ variables: { username, password } });
      // console.log(errors);
      const errors = res.data?.login.errors;
      if (errors) {
        errors.forEach(({ path, message }) => {
          setFormErrors((prev) => ({ ...prev, [path]: message }));
        });
      }
      if (res.data?.login.ok) {
        setUsername('');
        setPassword('');
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(formErrors);

  return (
    <Row className='justify-content-sm-center mt-5'>
      <Col sm={5}>
        <Card className='p-4'>
          <h3 className='text-center my-3'>
            <FontAwesomeIcon className='text-danger' icon={faInstagramSquare} />
            <span className='ml-2 text-primary'>Login</span>
          </h3>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text color='danger'>{formErrors.username}</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text color='danger'>{formErrors.password}</Form.Text>
            </Form.Group>
            <Button
              className='mt-4 mb-3'
              style={{ fontFamily: 'inherit' }}
              block
              type='submit'
              disabled={!username || !password}
            >
              LOGIN
            </Button>
            <small>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </small>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
