import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPortfolioAssets } from '../apis';
import AuthContext from '../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import GroupedTables from '../components/tables/MainTables';
import TreeMap from '../components/charts/Treemap';
import SideModules from '../components/sidemodules/SidePatrimonialTemplate';
import PortfolioNav from '../components/nav/PortfolioNavTemplate';
import { assets_by, total_by, treemap_by, tickers_piechart } from '../group_functions';
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
  const piechart = tickers_piechart(portfolio_assets, assetType, currency);

  return (
    <MainLayout>
      <Container fluid>
        <PortfolioNav 
          currency={currency}
        />
        {layout === 'threeColumns' ? (
            <Row>
              <Col lg={4}>
                  <SideModules 
                    group_total={total} 
                    currency={currency}
                  />
              </Col>
              <Col lg={4}>
                  <PieChart 
                    total={piechart} 
                    currency={currency}
                  />
              </Col>
              <Col lg={4}>
                  <PieChart 
                    total={total} 
                    currency={currency}
                  />
              </Col>
              <Col lg={12}>
                  <GroupedTables 
                      grouped_assets={assets}
                      currency={currency}
                   />
                  <TreeMap portfolio_treemap={treemap} />
              </Col>
            </Row>
        ) : (
            <Row>
              <Col lg={4}>
                  <SideModules 
                  group_total={total} 
                  currency={currency}
                  />
              </Col>
              <Col lg={8}>
                  <TreeMap portfolio_treemap={treemap} />
              </Col>
              <Col lg={12}>
                  <GroupedTables 
                    grouped_assets={assets} 
                    currency={currency}
                  />
              </Col>
            </Row>
        )}
      </Container>
    </MainLayout>
  )
};

export default Portfolio;
