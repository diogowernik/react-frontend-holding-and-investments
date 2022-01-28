import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import Portfolios from '../pages/Portfolios';
import Portfolio from '../pages/Portfolio';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>

          <PrivateRoute exact path='/portfolios/:id'>
            <Portfolio />
          </PrivateRoute>
          
          <PrivateRoute exact path='/portfolios'>
            <Portfolios />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
