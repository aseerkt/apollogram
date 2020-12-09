import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import './App.css';
import Register from './routes/Register';
import { useMeQuery } from './generated/graphql';
import PrivateRoute from './containers/PrivateRoute';
import Posts from './routes/Posts';
import { Alert, Spinner } from 'react-bootstrap';

const App: React.FC = () => {
  const { loading, error } = useMeQuery({ fetchPolicy: 'network-only' });

  if (loading) {
    return <Spinner animation='grow' />;
  } else if (error) {
    return <Alert>{error.message}</Alert>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/posts' component={Posts} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
