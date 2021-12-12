import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import Places from '../pages/Places';
import Place from '../pages/Place';

import Portfolios from '../pages/Portfolios';

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

          <PrivateRoute exact path='/places/:id'>
            <Place />
          </PrivateRoute>
          <PrivateRoute exact path='/places'>
            <Places />
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
