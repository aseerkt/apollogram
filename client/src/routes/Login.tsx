import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ username: null, password: null });

  const [login] = useLoginMutation({
    variables: { username, password },
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
    <Row className='mt-5 justify-content-md-center'>
      <Col md={6}>
        <Card>
          <Card.Header>
            <Link
              to='/'
              className='d-flex text-decoration-none justify-content-center align-items-center'
            >
              <FaInstagram size='4em' />
              <h1 className='mb-0 d-inline font-weight-bolder'>Instagram</h1>
            </Link>
            <h2 className='text-center font-weight-bolder'>Login</h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Form.Control
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Text className='text-danger'>{errors.username}</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className='text-danger'>{errors.password}</Form.Text>
              </Form.Group>
              <Button type='submit' disabled={!username || !password}>
                Login
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <small>
              Don't have an account? <Link to='/register'>Sign Up</Link>{' '}
            </small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
