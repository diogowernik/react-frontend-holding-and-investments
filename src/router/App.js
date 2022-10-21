import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import MyPortfolios from '../pages/MyPortfolios';

import PortfolioUsd from '../pages/PortfolioUsd';

import RadarBrl from '../pages/Brl/Radar';
import DividendsBrl from '../pages/Brl/Dividends';
import PortfolioBrl from '../pages/Brl/Portfolio';
import BrokersBrl from '../pages/Brl/Brokers';
import FiisBrl from '../pages/Brl/Fiis';
import BrStocksBrl from '../pages/Brl/BrStocks';
import StocksBrl from '../pages/Brl/Stocks';
import ReitsBrl from '../pages/Brl/Reits';


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
          <PrivateRoute exact path='/radar/brl'>
            <RadarBrl />
          </PrivateRoute>
          {/* Dividends */}
          <PrivateRoute exact path='/dividends/:id/brl'>
            <DividendsBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/brokers/:id/brl'>
            <BrokersBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/fiis/:id/brl'>
            <FiisBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/br_stocks/:id/brl'>
            <BrStocksBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/stocks/:id/brl'>
            <StocksBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/reits/:id/brl'>
            <ReitsBrl />
          </PrivateRoute>

        

          <PrivateRoute exact path='/portfolio/:id/brl'>
            <PortfolioBrl />
          </PrivateRoute>
          
          <PrivateRoute exact path='/portfolio/:id/usd'>
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
