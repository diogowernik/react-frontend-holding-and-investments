import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioAssets } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import GroupedTables from '../components/tables/Brl/MainTable';
import TreeMap from '../components/charts/Treemap';
import SideModules from '../components/sidemodules/Brl/SidePatrimonial';
import PortfolioNav from '../components/nav/PortfolioNavTemplate';
import { assets_by, total_by, treemap_by, piechart_by_ticker } from '../group_functions';

// Importe o componente PieChart também
import PieChart from '../components/charts/PieChart';

const Portfolio = ({assetType, groupBy, currency, layout}) => {
  const [portfolio_assets, setPortfolioAssets] = useState([]);

  const auth = useContext(AuthContext);
  const params = useParams();

  const onFetchPortfolioAssets = useCallback(async () => {
      const json = await fetchPortfolioAssets(params.id, auth.token, assetType);
      if (json) {
          setPortfolioAssets(json);
      }
  }, [params.id, auth.token, assetType]);
  
  useEffect(() => {
      onFetchPortfolioAssets();
  }, [onFetchPortfolioAssets]);

  const assets = assets_by(portfolio_assets, groupBy, assetType);
  const total = total_by(portfolio_assets, groupBy, currency, assetType);
  const treemap = treemap_by(portfolio_assets, groupBy, assetType);
  const piechart = piechart_by_ticker(portfolio_assets, assetType);

  return (
    <MainLayout>
      <Container fluid>
        <PortfolioNav 
          currency={currency}
        />
        {layout === 'threeColumns' ? (
            <Row>
              <Col lg={4}>
                  <SideModules group_total={total} />
              </Col>
              <Col lg={4}>
                  <PieChart total={piechart} />
              </Col>
              <Col lg={4}>
                  <PieChart total={total} />
              </Col>
              <Col lg={12}>
                  <GroupedTables grouped_assets={assets} />
                  <TreeMap portfolio_treemap={treemap} />
              </Col>
            </Row>
        ) : (
            <Row>
              <Col lg={4}>
                  <SideModules group_total={total} />
              </Col>
              <Col lg={8}>
                  <TreeMap portfolio_treemap={treemap} />
              </Col>
              <Col lg={12}>
                  <GroupedTables grouped_assets={assets} />
              </Col>
            </Row>
        )}
      </Container>
    </MainLayout>
  )
};

export default Portfolio;
