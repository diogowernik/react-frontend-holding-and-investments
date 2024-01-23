import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

import Portfolios from '../pages/Portfolios';

import Radars from '../pages/Radars';
import RadarHome from '../pages/Radar/Home';


import FiisRadar from '../pages/Radar/Fiis';
import BrStocksRadar from '../pages/Radar/BrStocks';
import ReitsRadar from '../pages/Radar/Reits';
import StocksRadar from '../pages/Radar/Stocks';
import DistributionCalculator from '../pages/Radar/DistributionCalculator';
import DistributionPanel from '../pages/Radar/DistributionPanel'; 

import DividendsBrl from '../pages/Brl/Dividends';
import CategoryBrl from '../pages/Brl/Category';
import BrokersBrl from '../pages/Brl/Brokers';
import FiisBrl from '../pages/Brl/Fiis';
import BrStocksBrl from '../pages/Brl/BrStocks';
import StocksBrl from '../pages/Brl/Stocks';
import ETFsBrl from '../pages/Brl/ETFs';
import ReitsBrl from '../pages/Brl/Reits';
import EvolutionBrl from '../pages/Brl/Evolution';

import DividendsUsd from '../pages/Usd/Dividends';
import CategoryUsd from '../pages/Usd/Category';
import BrokersUsd from '../pages/Usd/Brokers';
import FiisUsd from '../pages/Usd/Fiis';
import BrStocksUsd from '../pages/Usd/BrStocks';
import StocksUsd from '../pages/Usd/Stocks';
import ETFsUsd from '../pages/Usd/ETFs';
import ReitsUsd from '../pages/Usd/Reits';
import EvolutionUsd from '../pages/Usd/Evolution';
import KidsDividends from '../pages/KidsDividends';


function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/isabel'>
            <KidsDividends />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <PrivateRoute exact path='/portfolio/:id/radars'>
            <Radars />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/radar/:radar_id'>
            <RadarHome />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/radar/:radar_id/fiis'>
            <FiisRadar />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/radar/:radar_id/br_stocks'>
            <BrStocksRadar />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/radar/:radar_id/reits'>
            <ReitsRadar />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/radar/:radar_id/distribution_calculator'>
            <DistributionCalculator />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/radar/:radar_id/stocks'>
            <StocksRadar />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/radar/:radar_id/distribution_panel'>
            <DistributionPanel />
          </PrivateRoute>

          <PrivateRoute exact path='/portfolios'>
            <Portfolios />
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
          <PrivateRoute exact path='/etfs/:id/brl'>
            <ETFsBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/reits/:id/brl'>
            <ReitsBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/brl'>
            <CategoryBrl />
          </PrivateRoute>
          <PrivateRoute exact path='/evolution/:id/brl'>
            <EvolutionBrl />
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
          <PrivateRoute exact path='/etfs/:id/usd'>
            <ETFsUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/reits/:id/usd'>
            <ReitsUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/portfolio/:id/usd'>
            <CategoryUsd />
          </PrivateRoute>
          <PrivateRoute exact path='/evolution/:id/usd'>
            <EvolutionUsd />
          </PrivateRoute>
          

        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
