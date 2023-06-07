import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import Portfolios from '../pages/Portfolios';
import PortfolioEvolution from '../pages/Evolution';

// import PortfolioUsd from '../pages/PortfolioUsd';

import Radar from '../pages/Radar';
import DividendsBrl from '../pages/Brl/Dividends';
import CategoryBrl from '../pages/Brl/Category';
import BrokersBrl from '../pages/Brl/Brokers';
import FiisBrl from '../pages/Brl/Fiis';
import BrStocksBrl from '../pages/Brl/BrStocks';
import StocksBrl from '../pages/Brl/Stocks';
import ReitsBrl from '../pages/Brl/Reits';

import DividendsUsd from '../pages/Usd/Dividends';
import CategoryUsd from '../pages/Usd/Category';
import BrokersUsd from '../pages/Usd/Brokers';
import FiisUsd from '../pages/Usd/Fiis';
import BrStocksUsd from '../pages/Usd/BrStocks';
import StocksUsd from '../pages/Usd/Stocks';
import ReitsUsd from '../pages/Usd/Reits';


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

          <PrivateRoute exact path='/radar'>
            <Radar />
          </PrivateRoute>
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
            <CategoryBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/dividends/:id/usd'>
            <DividendsUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/brokers/:id/usd'>
            <BrokersUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/fiis/:id/usd'>
            <FiisUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/br_stocks/:id/usd'>
            <BrStocksUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/stocks/:id/usd'>
            <StocksUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/reits/:id/usd'>
            <ReitsUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/usd'>
            <CategoryUsd />
          </PrivateRoute>
          
          <PrivateRoute exact path='/portfolios'>
            <Portfolios />
          </PrivateRoute>
          <PrivateRoute exact path='/evolution/:id'>
            <PortfolioEvolution />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
