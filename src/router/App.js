import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import MyPortfolios from '../pages/MyPortfolios';
import PortfolioBrl from '../pages/PortfolioBrl';
import PortfolioUsd from '../pages/PortfolioUsd';

import Radar from '../pages/Radar';
import Dividends from '../pages/Dividends';

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
          {/* Radar */}
          <PrivateRoute exact path='/radar'>
            <Radar />
          </PrivateRoute>
          {/* Dividends */}
          <PrivateRoute exact path='/dividends/:id'>
            <Dividends />
          </PrivateRoute>
        

          <PrivateRoute exact path='/portfolio_brl/:id'>
            <PortfolioBrl />
          </PrivateRoute>
          
          <PrivateRoute exact path='/portfolio_usd/:id'>
            <PortfolioUsd />
          </PrivateRoute>
          
          <PrivateRoute exact path='/portfolios'>
            <MyPortfolios />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
