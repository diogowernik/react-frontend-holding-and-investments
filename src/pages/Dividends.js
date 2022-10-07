import {Container} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioDividends } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback} from 'react';
 import { useParams} from 'react-router-dom';
//  import Dividends from '../components/tables/Dividends';
import DividendsTable from '../components/tables/Dividends';


const Radar = () => {
  const [portfolio_dividends, setPortfolioDividends] = useState([]);
  // console.log(portfolio_dividends);

  const auth = useContext(AuthContext);
  const params = useParams();

  const onFetchPortfolioDividends = useCallback(async () => {
    const json = await fetchPortfolioDividends(params.id, auth.token);
    if (json) {
        setPortfolioDividends(json);
    }
    }, [params.id, auth.token]);
    useEffect(() => {
    onFetchPortfolioDividends();
    }, [onFetchPortfolioDividends]);

  // end of Fetchs

  // Grouping for Dividends for Radar

  return (
    <MainLayout>
      <Container fluid>
        <h3>Dividends</h3>
        <DividendsTable portfolio_dividends={portfolio_dividends} />

        
      </Container>
      
    </MainLayout>
  )
};

export default Radar;