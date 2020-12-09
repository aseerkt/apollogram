import React from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import { RouteComponentProps } from 'react-router-dom';
import { apolloClient } from '..';
import { MeDocument } from '../generated/graphql';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { me } = apolloClient.readQuery({ query: MeDocument });
  if (me) history.push('/posts');

  return (
    <Row className='justify-content-md-center mt-5'>
      <Col md={6}>
        <Card>
          <Card.Header>
            <FaInstagram size='4em' className='d-block mx-auto' />
            <h1 className='text-center font-weight-bolder'>Instagram Clone</h1>
          </Card.Header>
          <Card.Body className='text-center'>
            <Button onClick={() => history.push('/login')} className='mr-2'>
              Login
            </Button>
            <Button variant='danger' onClick={() => history.push('/register')}>
              Sign Up
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
