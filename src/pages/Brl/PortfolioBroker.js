import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';
import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import GroupedTables from '../../components/tables/Brl/MainTable';
import TreeMap from '../../components/charts/Treemap';
import SideModules from '../../components/sidemodules/Brl/SidePatrimonial'
import PortfolioNav from '../../components/nav/Brl/PortfolioNav';
import { assets_by, total_by, treemap_by} from '../../group_functions';

const Portfolio = ({groupBy, currency}) => {
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

  const assets = assets_by(portfolio_assets, groupBy)
  const total = total_by(portfolio_assets, groupBy, currency)
  const treemap = treemap_by(portfolio_assets, groupBy)

  return (
    <MainLayout>
      <Container fluid>
        <PortfolioNav />
        <Row>
          <Col lg={4}>
              <SideModules 
              group_total={total}
              />
          </Col> 
          <Col lg={8}>
              <TreeMap
              portfolio_treemap={treemap}
              />  
          </Col>
          <Col lg={12}>
              <GroupedTables
              grouped_assets={assets}
              />
          </Col>
        </Row>              
      </Container>
    </MainLayout>
  )
};

export default Portfolio;
