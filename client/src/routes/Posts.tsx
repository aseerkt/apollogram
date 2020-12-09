import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddPost from '../components/AddPost';

const Posts: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <AddPost />
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
