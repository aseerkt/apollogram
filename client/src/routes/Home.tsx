import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { apolloClient } from '..';
import FormWrapper from '../containers/FormWrapper';
import Button from '../components-ui/Button';
import { MeDocument } from '../generated/graphql';

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { me } = apolloClient.readQuery({ query: MeDocument });
  if (me) history.push('/posts');

  return (
    <FormWrapper title='Home'>
      <div className='p-10 text-center'>
        <Button onClick={() => history.push('/login')} className='mr-2'>
          Login
        </Button>
        <Button color='dark' onClick={() => history.push('/register')}>
          Sign Up
        </Button>
      </div>
    </FormWrapper>
  );
};

export default Home;
