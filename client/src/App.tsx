import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './containers/layouts/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
