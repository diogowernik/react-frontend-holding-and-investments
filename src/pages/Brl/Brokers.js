import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';
import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupedTables from '../../components/tables/MainTablesBrl';
import TreeMap from '../../components/charts/Treemap';
import SideModules from '../../components/sidemodules/Brl/SidePatrimonial'
import PortfolioNav from '../../components/nav/PortfolioNav';
import { assets_by, piechart_by_ticker, total_brl_by, treemap_by} from '../../group_functions';

const Portfolio = () => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  // Fetchs
  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(params.id, auth.token);
      if (json) {
          setPortfolioAssets(json);
      }
      }, [params.id, auth.token]);
      useEffect(() => {
      onFetchPortfolioAssets();
      }, [onFetchPortfolioAssets]);


  // end of Fetchs

  const assets_by_broker = assets_by(portfolio_assets, 'broker')
  const brokers_total_brl = total_brl_by(portfolio_assets, 'broker')
  const treemap_brokers = treemap_by(portfolio_assets, 'broker')



  return (
    <MainLayout>
      <Container fluid>
        <PortfolioNav />
        <Row>
          <Col lg={4}>
              <SideModules 
              group_total={brokers_total_brl}
              />
          </Col> 
          <Col lg={8}>
              <TreeMap
              portfolio_treemap={treemap_brokers}
              />  
          </Col>
          <Col lg={12}>
              <GroupedTables
              grouped_assets={assets_by_broker}
              />
          </Col>
        </Row>              

      </Container>
      
    </MainLayout>
  )
};

export default Portfolio;