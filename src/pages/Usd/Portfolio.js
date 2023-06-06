import { Row, Col, Container} from 'react-bootstrap';
import MainLayout from '../../layouts/MainLayout';

import { fetchPortfolioAssets} from '../../apis';
import AuthContext from '../../contexts/AuthContext';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MainTable from '../../components/tables/Brl/MainTable';
import PieChart from '../../components/charts/PieChart';
import TreeMap from '../../components/charts/Treemap';
import SideModules from '../../components/sidemodules/Brl/SidePatrimonial'
import SideDividends from '../../components/sidemodules/Brl/SideDividends';
import PortfolioNav from '../../components/nav/Brl/PortfolioNav';
import { assets_by, total_by, treemap_by} from '../../group_functions';


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

  const assets = assets_by(portfolio_assets,'category')
  const total  = total_by(portfolio_assets,'category', 'brl')
  const treemaps = treemap_by(portfolio_assets,"category")

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
          <Col lg={5}>
              <PieChart 
              total={total}
              />  
          </Col> 
          
          <Col lg={3}>
              <SideDividends />
          </Col> 
          <Col lg={12}>
              <MainTable
              grouped_assets={assets}
              />
              <TreeMap
              portfolio_treemap={treemaps}
              /> 
                
          </Col>
        </Row>
                
      </Container>
      
    </MainLayout>
  )
};

export default Portfolio;