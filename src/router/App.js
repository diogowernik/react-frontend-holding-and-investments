import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import MyPortfolios from '../pages/MyPortfolios';

// import PortfolioUsd from '../pages/PortfolioUsd';

import Radar from '../pages/Radar';
import DividendsBrl from '../pages/Brl/Dividends';
import PortfolioBrl from '../pages/Brl/Portfolio';
import BrokersBrl from '../pages/Brl/Brokers';
import FiisBrl from '../pages/Brl/Fiis';
import BrStocksBrl from '../pages/Brl/BrStocks';
import StocksBrl from '../pages/Brl/Stocks';
import ReitsBrl from '../pages/Brl/Reits';

import RadarUsd from '../pages/Usd/Radar';
import DividendsUsd from '../pages/Usd/Dividends';
import PortfolioUsd from '../pages/Usd/Portfolio';
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
            <PortfolioBrl />
          </PrivateRoute>
          
          <PrivateRoute exact path='/radar/usd'>
            <RadarUsd />
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
