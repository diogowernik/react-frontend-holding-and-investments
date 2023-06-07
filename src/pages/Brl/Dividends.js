import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';

import { fetchPortfolioDividends} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams} from 'react-router-dom';
import DividendsTables from '../../components/tables/DividendsTables';
import SideDividends from '../../components/sidemodules/Brl/SideDividends';
import PortfolioNav from '../../components/nav/PortfolioNavTemplate';
import { dividends_by } from '../../group_functions';


const Portfolio = () => {
  const [portfolio_dividends, setPortfolioDividends] = useState([]);

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


  const year_dividends = dividends_by(portfolio_dividends,"pay_date_by_year")
  const month_dividends = dividends_by(portfolio_dividends,"pay_date_by_month_year")
  const category_dividends = dividends_by(portfolio_dividends,"category")


  return (
    <MainLayout>
      <Container fluid>
          <PortfolioNav
            currency="brl"
          />
          <Row>
            <Col lg={3}> 
                <SideDividends />
            </Col> 
            <Col lg={9}>
                <DividendsTables
                year_dividends={year_dividends}
                month_dividends={month_dividends}
                currency="brl"
                category_dividends={category_dividends}
                
                />
            </Col>
          </Row>                     
      </Container>
    </MainLayout>
  )
};

export default Portfolio;